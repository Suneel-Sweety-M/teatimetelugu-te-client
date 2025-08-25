import React, { useEffect, useState, useCallback } from "react";
import "../components/gallery/gallery.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getFilteredGallery } from "../helper/apis";
import { toast } from "react-toastify";
import ScrollTop from "../components/scroll-top/ScrollTop";

const POSTS_PER_PAGE = 12;

const Gallery = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const pageParam = parseInt(queryParams.get("page"), 10);

  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageParam || 1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPictures = useCallback(async () => {
    document.title = "టీ టైం తెలుగు - గ్యాలరీ";
    setIsLoading(true);
    try {
      const res = await getFilteredGallery(
        "",
        "",
        "",
        currentPage,
        POSTS_PER_PAGE
      );
      if (res?.status === "success") {
        setGallery(res?.gallery || []);
        setTotalPages(res?.pagination?.totalPages || 1);
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error fetching gallery posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchPictures();
    window.scrollTo(0, 0);
  }, [fetchPictures]);

  useEffect(() => {
    if (!isNaN(pageParam) && pageParam > 0) {
      setCurrentPage(pageParam);
    } else {
      setCurrentPage(1);
    }
  }, [pageParam]);

  const goToPage = (page) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    navigate(`/gallery?page=${validPage}`);
  };

  const handlePrevious = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  const renderPagination = () => (
    <div className="news-pagenations">
      <div className="news-page-count">
        {totalPages > 1 && (
          <span onClick={handlePrevious}>
            <i className="fa fa-angle-left"></i>
          </span>
        )}
        {totalPages > 1 && (
          <span className="currentPage-text">
            Page {currentPage} of {totalPages}
          </span>
        )}
        {totalPages > 1 && (
          <span onClick={handleNext}>
            <i className="fa fa-angle-right"></i>
          </span>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="gallery-page main-page">
        <div className="gallery-title-container">
          <h1 className="text-capital">గ్యాలరీ</h1>
        </div>

        {!isLoading ? (
          <div className="gallery-section">
            {gallery.length > 0 ? (
              gallery.map((item) => (
                <Link
                  to={`/gallery/${item?.newsId}`}
                  className="gallery-card"
                  key={item?._id}
                  aria-label={`View ${item?.name?.en} gallery`}
                >
                  <div className="gallery-image-container">
                    <img
                      src={
                        item?.galleryPics[0] ||
                        "https://res.cloudinary.com/demmiusik/image/upload/v1729620719/EET_cyxysf.png"
                      }
                      alt={item?.name?.en}
                      loading="lazy"
                    />
                  </div>
                  <span className="gallery-name">{item?.title?.te}</span>
                </Link>
              ))
            ) : (
              <p>No posts found in gallery.</p>
            )}
          </div>
        ) : (
          <div className="gallery-section">
            {[...Array(9)].map((_, index) => (
              <div className="gallery-card" key={index}>
                <div className="gallery-image-container">
                  <img
                    src="https://res.cloudinary.com/demmiusik/image/upload/v1729620719/EET_cyxysf.png"
                    alt="Placeholder"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {renderPagination()}
      </div>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Gallery;
