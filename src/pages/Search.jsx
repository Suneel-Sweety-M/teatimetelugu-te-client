import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import TabTitle from "../components/titles/TabTitle";
import SectionTitle from "../components/titles/SectionTitle";
import { toast } from "react-toastify";
import { getSearchNewsTelugu } from "../helper/apis";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const CATEGORIES = [
  { key: "news", title: "న్యూస్" },
  { key: "politics", title: "రాజకీయాలు" },
  { key: "movies", title: "చలనచిత్రాలు" },
  { key: "ott", title: "ఓటిటి" },
  { key: "gallery", title: "గ్యాలరీ" },
  { key: "videos", title: "వీడియోలు" },
  { key: "gossips", title: "గాసిప్స్" },
  { key: "reviews", title: "సమీక్షలు" },
  { key: "collections", title: "సేకరణలు" },
  { key: "shows", title: "షోలు" },
];

const PLACEHOLDER_IMAGE =
  "https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png";
const ERROR_IMAGE =
  "https://via.placeholder.com/300x200?text=Image+Not+Available";

const Search = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const initialQuery = queryParams.get("q") || "";

  const [searchText, setSearchText] = useState(initialQuery);
  const [teluguText, setTeluguText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // For each category: items, skip count, hasMore
  const [searchData, setSearchData] = useState(() =>
    CATEGORIES.reduce((acc, cat) => {
      acc[cat.key] = { items: [], skip: 0, hasMore: true };
      return acc;
    }, {})
  );

  const limit = 9;

  // Convert input to Telugu using Google Input Tools API
  const convertToTelugu = useCallback(async (text) => {
    if (!text.trim()) {
      setTeluguText("");
      return;
    }
    try {
      const res = await fetch(
        `https://inputtools.google.com/request?text=${encodeURIComponent(
          text
        )}&itc=te-t-i0-und`
      );
      const data = await res.json();
      if (data?.[0] === "SUCCESS") {
        const result = data[1][0][1];
        const converted = Array.isArray(result) ? result[0] : result;
        setTeluguText(String(converted));
      } else {
        setTeluguText(text); // fallback
      }
    } catch (err) {
      console.error("Transliteration failed:", err);
      setTeluguText(text); // fallback
    }
  }, []);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchText.trim()) {
      toast.info("దయచేసి ఒక పదం ఇవ్వండి!");
      return;
    }
    navigate(`/search?q=${encodeURIComponent(searchText)}`);
    setHasSearched(true);
    resetAndFetchAll();
  };

  // Reset searchData and fetch again
  const resetAndFetchAll = useCallback(() => {
    setSearchData(() =>
      CATEGORIES.reduce((acc, cat) => {
        acc[cat.key] = { items: [], skip: 0, hasMore: true };
        return acc;
      }, {})
    );
    CATEGORIES.forEach((cat) => fetchCategory(cat.key, 0));
  }, [teluguText]);

  // Fetch results for a single category
  const fetchCategory = useCallback(
  async (category, customSkip) => {
    const current = searchData[category];
    const skipVal = customSkip !== undefined ? customSkip : current.skip;
    if (!current.hasMore && customSkip === undefined) return;

    if (typeof teluguText !== "string" || !teluguText.trim()) return;

    try {
      setIsLoading(true);
      const res = await getSearchNewsTelugu(teluguText, skipVal, limit);
      console.log("API Response for Telugu:", res?.data); // 👈 debug
      if (res?.status === "success") {
        const catData = res.data[category];
        if (Array.isArray(catData)) {
          const newItems =
            skipVal === 0 ? catData : [...current.items, ...catData];
          const newSkip = skipVal + catData.length;
          setSearchData((prev) => ({
            ...prev,
            [category]: {
              items: newItems,
              skip: newSkip,
              hasMore: catData.length === limit,
            },
          }));
        }
      } else {
        toast.error("ఫలితాలు తెచ్చే ప్రయత్నంలో లోపం జరిగింది!");
      }
    } catch (err) {
      console.error(err);
      toast.error("ఫలితాలు తెచ్చే ప్రయత్నంలో లోపం జరిగింది!");
    } finally {
      setIsLoading(false);
    }
  },
  [teluguText, searchData]
);

  // When query changes in URL
  useEffect(() => {
    if (initialQuery) {
      setSearchText(initialQuery);
      convertToTelugu(initialQuery);
      setHasSearched(true);
    }
  }, [initialQuery, convertToTelugu]);

  // When teluguText updates, fetch results
  useEffect(() => {
    if (teluguText.trim()) {
      resetAndFetchAll();
    }
  }, [teluguText, resetAndFetchAll]);

  const renderPostItem = (item, category) => (
    <Link
      key={item._id}
      to={
        category === "gallery"
          ? `/gallery/${item._id}`
          : category === "videos"
          ? `/videos/v/${item._id}`
          : `/${category}/${item._id}`
      }
      className="single-category-post"
    >
      <div className="video-thumbnail-container">
        <img
          src={
            category === "gallery"
              ? item.galleryPics?.[0]?.url || ERROR_IMAGE
              : item.mainUrl || ERROR_IMAGE
          }
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = ERROR_IMAGE;
          }}
        />
        {category === "videos" && (
          <div className="play-icon">
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>
      <div className="single-category-post-texts">
        <span className="video-meta">
          {moment(item.createdAt).format("Do MMM YYYY")}
        </span>
        <h3 className="video-title">{item.title}</h3>
      </div>
    </Link>
  );

  const renderCategory = (cat) => {
    const data = searchData[cat.key];
    if (!data || data.items.length === 0) return null;
    return (
      <div className="videos-category-container" key={cat.key}>
        <SectionTitle title={cat.title} nav={`/${cat.key}`} />
        <div className="all-category-posts-container">
          {data.items.map((item) => renderPostItem(item, cat.key))}
        </div>
        {data.hasMore && (
          <button
            className="load-more-btn"
            onClick={() => fetchCategory(cat.key)}
          >
            <span className="btn-text">మరిన్ని లోడ్ చేయండి</span>
            <span className="btn-icon">
              <i className="fa-solid fa-arrow-rotate-right"></i>
            </span>
          </button>
        )}
      </div>
    );
  };

  const hasResults = Object.values(searchData).some((cat) => cat?.items?.length > 0);

  useEffect(()=> {
    window.title = `టీ టైం తెలుగు - శోధించండి`;
  }, []);

  return (
    <>
      <Navbar />
      <div className="search-page main-page">
        <TabTitle title="తెలుగులో శోధించండి" />
        <div className="search-page-container">
          <div className="search-container-top">
            <form onSubmit={handleSearch} className="search-container-input-box">
              <input
                type="text"
                placeholder="ఇక్కడ శోధించండి..."
                value={searchText}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchText(val);
                  convertToTelugu(val);
                }}
                aria-label="Search input"
              />
              <button
                type="submit"
                className="btn search-btn"
                aria-label="Search"
                disabled={isLoading}
              >
                {isLoading ? "శోధిస్తోంది..." : "Search"}
              </button>
            </form>
            {teluguText && (
              <h1 className="search-text text-capital main-padding">
                ఫలితాలు <span>{teluguText}</span> కోసం
              </h1>
            )}
          </div>

          {isLoading && !hasResults ? (
            <div className="all-category-posts-container">
              {Array.from({ length: 9 }).map((_, i) => (
                <div className="single-category-post box-shadow" key={i}>
                  <img src={PLACEHOLDER_IMAGE} alt="Loading placeholder" />
                </div>
              ))}
            </div>
          ) : hasResults ? (
            <div className="all-videos-container">
              {CATEGORIES.map((c) => renderCategory(c))}
            </div>
          ) : (
            hasSearched && (
              <p className="text-capital main-padding text-center">
                "{teluguText || searchText}" కి ఫలితాలు దొరకలేదు
              </p>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
