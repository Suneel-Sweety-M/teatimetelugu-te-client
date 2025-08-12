// ✅ Telugu Search with working limit-loading per category
import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import TabTitle from "../components/titles/TabTitle";
import SectionTitle from "../components/titles/SectionTitle";
import { toast } from "react-toastify";
import { getSearchNewsTelugu } from "../helper/apis";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import ScrollTop from "../components/scroll-top/ScrollTop";

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

  // Each category: items, skip count, hasMore
  const [searchData, setSearchData] = useState(() =>
    CATEGORIES.reduce((acc, cat) => {
      acc[cat.key] = { items: [], skip: 0, hasMore: true };
      return acc;
    }, {})
  );

  const limit = 9;

  // Convert input to Telugu
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
    } catch {
      setTeluguText(text);
    }
  }, []);

  // Search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchText.trim()) {
      toast.info("దయచేసి ఒక పదం ఇవ్వండి!");
      return;
    }
    navigate(`/search?q=${encodeURIComponent(searchText)}`);
    setHasSearched(true);
    fetchAllCategories(teluguText);
  };

  // Reset + fetch all categories
  const fetchAllCategories = useCallback((term) => {
    setSearchData(
      CATEGORIES.reduce((acc, cat) => {
        acc[cat.key] = { items: [], skip: 0, hasMore: true };
        return acc;
      }, {})
    );
    CATEGORIES.forEach((cat) => fetchCategory(cat.key, term, 0));
  }, []);

  // Fetch one category with skip/limit
  const fetchCategory = useCallback(
    async (categoryKey, term, customSkip = 0) => {
      if (!term.trim()) return;
      try {
        setIsLoading(true);
        const res = await getSearchNewsTelugu(term, customSkip, limit);
        if (res?.status === "success") {
          const categoryResult = res.data[categoryKey];
          if (categoryResult) {
            setSearchData((prev) => {
              const old = prev[categoryKey];
              const newSkip = customSkip + limit;
              return {
                ...prev,
                [categoryKey]: {
                  items:
                    customSkip === 0
                      ? categoryResult.items
                      : [...old.items, ...categoryResult.items],
                  skip: newSkip,
                  hasMore: newSkip < categoryResult.total,
                },
              };
            });
          }
        } else {
          toast.error(`"${categoryKey}" ఫలితాలు లోడ్ చేయలేకపోయాం`);
        }
      } catch (err) {
        toast.error("ఫలితాలు తెచ్చే ప్రయత్నంలో లోపం జరిగింది!");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // On mount or URL change
  useEffect(() => {
    if (initialQuery) {
      setSearchText(initialQuery);
      convertToTelugu(initialQuery);
      setHasSearched(true);
    }
  }, [initialQuery, convertToTelugu]);

  // When Telugu text changes
  useEffect(() => {
    if (teluguText.trim()) {
      fetchAllCategories(teluguText);
    }
  }, [teluguText, fetchAllCategories]);

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
    if (!data.items.length) return null;
    return (
      <div className="videos-category-container" key={cat.key}>
        <SectionTitle title={cat.title} nav={`/${cat.key}`} />
        <div className="all-category-posts-container">
          {data.items.map((item) => renderPostItem(item, cat.key))}
        </div>
        {data.hasMore && (
          <button
            className="load-more-btn"
            onClick={() => fetchCategory(cat.key, teluguText, data.skip)}
          >
            {isLoading ? (
              <>
                <span className="btn-text">లోడ్ అవుతోంది...</span>
                <span className="btn-icon spinner"></span>
              </>
            ) : (
              <>
                <span className="btn-text">మరిన్ని లోడ్ చేయండి</span>
                <span className="btn-icon">
                  <i className="fa-solid fa-arrow-rotate-right"></i>
                </span>
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  const hasResults = Object.values(searchData).some(
    (cat) => cat.items.length > 0
  );

  document.title = `Search ${teluguText || searchText}`;

  return (
    <>
      <Navbar />
      <div className="search-page main-page">
        <TabTitle title="తెలుగులో శోధించండి" />
        <div className="search-page-container">
          <div className="search-container-top">
            <form
              onSubmit={handleSearch}
              className="search-container-input-box"
            >
              <input
                type="text"
                placeholder="ఇక్కడ శోధించండి..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  convertToTelugu(e.target.value);
                }}
              />
              <button
                type="submit"
                className="btn search-btn"
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
              {CATEGORIES.map((cat) => renderCategory(cat))}
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
      <ScrollTop />
    </>
  );
};

export default Search;
