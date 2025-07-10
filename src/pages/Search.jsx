import React, { useCallback, useEffect, useState, useMemo } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import TabTitle from "../components/titles/TabTitle";
import { toast } from "react-toastify";
import { getSearchNews } from "../helper/apis";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SectionTitle from "../components/titles/SectionTitle";
import moment from "moment";

const CATEGORIES = [
  "news",
  "politics",
  "movies",
  "ott",
  "gallery",
  "videos",
  "gossips",
  "reviews",
  "collections",
  "shows",
];

const PLACEHOLDER_IMAGE = "https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png";
const ERROR_IMAGE = "https://via.placeholder.com/300x200?text=Image+Not+Available";

const Search = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("q") || "";

  const [searchText, setSearchText] = useState(query);
  const [searchData, setSearchData] = useState({});
  const [visiblePosts, setVisiblePosts] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [teluguText, setTeluguText] = useState("");

  const convertToTelugu = useCallback(async (text) => {
    if (!text.trim()) return;
    
    try {
      const response = await fetch(
        `https://inputtools.google.com/request?text=${encodeURIComponent(text)}&itc=te-t-i0-und`
      );
      const data = await response.json();
      if (data?.[0] === "SUCCESS") {
        setTeluguText(data[1][0][1]);
      }
    } catch (error) {
      console.error("Transliteration failed:", error);
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedText = searchText.trim();
    
    if (!trimmedText) {
      toast.info("Please enter a search term!");
      return;
    }
    
    setHasSearched(true);
    navigate(`/search?q=${encodeURIComponent(trimmedText)}`);
  };

  const fetchSearchResults = useCallback(async () => {
    if (!teluguText) return;
    
    setIsLoading(true);
    try {
      const res = await getSearchNews(teluguText);
      if (res?.status === "success") {
        setSearchData(res?.data || {});
      } else {
        setSearchData({});
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      toast.error("Something went wrong while fetching results!");
      setSearchData({});
    } finally {
      setIsLoading(false);
    }
  }, [teluguText]);

  useEffect(() => {
    document.title = searchText ? `Search - ${searchText}` : "Search";
  }, [searchText]);

  useEffect(() => {
    if (query) {
      setSearchText(query);
      convertToTelugu(query);
    }
  }, [query, convertToTelugu]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 8);
  };

  const hasResults = useMemo(() => (
    Object.values(searchData).some(category => category?.length > 0)
  ), [searchData]);

  const renderPostItem = (item, category) => (
    <Link
      key={item?._id}
      to={`/${
        category === "actress" || category === "gallery" 
          ? "gallery" 
          : category
      }/${item?._id}`}
      className="single-category-post"
      aria-label={`View ${item?.title}`}
    >
      <div className="video-thumbnail-container">
        <img
          src={category === "gallery" ? item?.galleryPics[0]?.url : item?.mainUrl}
          alt={item?.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = ERROR_IMAGE;
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

  const renderPosts = (category) => {
    const categoryData = searchData[category] || [];
    if (categoryData.length === 0) return null;

    return (
      <div className="videos-category-container" key={category}>
        <SectionTitle
          title={category.charAt(0).toUpperCase() + category.slice(1)}
          nav={`/${category}`}
        />
        <div className="all-category-posts-container">
          {categoryData.slice(0, visiblePosts).map(item => renderPostItem(item, category))}
        </div>
        {visiblePosts < categoryData.length && (
          <button className="load-more-btn" onClick={loadMorePosts}>
            <span className="btn-text">Load More</span>
            <span className="btn-icon">
              <i className="fa-solid fa-arrow-rotate-right"></i>
            </span>
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="search-page main-page">
        <TabTitle title="Search" />
        <div className="search-page-container">
          <div className="search-container-top">
            <form onSubmit={handleSearch} className="search-container-input-box">
              <input
                type="text"
                placeholder="Type AndhraPradesh for ఆంధ్రప్రదేశ్"
                value={searchText}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchText(value);
                  convertToTelugu(value);
                }}
                aria-label="Search input"
              />
              <button
                type="submit"
                className="btn search-btn"
                aria-label="Search"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </form>
            {teluguText && (
              <h1 className="search-text text-capital main-padding">
                Results for <span>{teluguText}</span>
              </h1>
            )}
          </div>

          {isLoading ? (
            <div className="all-category-posts-container">
              {Array.from({ length: 12 }).map((_, index) => (
                <div className="single-category-post box-shadow" key={index}>
                  <img src={PLACEHOLDER_IMAGE} alt="Loading placeholder" />
                </div>
              ))}
            </div>
          ) : hasResults ? (
            <div className="all-videos-container">
              {CATEGORIES.map(renderPosts)}
            </div>
          ) : (
            hasSearched && (
              <p className="text-capital main-padding text-center">
                No results found for "{teluguText || searchText}"
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