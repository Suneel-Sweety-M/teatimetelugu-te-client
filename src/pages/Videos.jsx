import React from "react";
import "../components/videos/videos.css";
import AllVideos from "../components/videos/AllVideos";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import TabTitle from "../components/titles/TabTitle";
import ScrollTop from "../components/scroll-top/ScrollTop";
import { Link } from "react-router-dom";

const Videos = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const subcategory = queryParams.get("subcategory") || "";
  return (
    <>
      <Navbar />
      <div className="videos-page main-page">
        <TabTitle title={"వీడియోలు"} />
        <div className="all-categories-container"> 
          <Link to={"/videos?subcategory=latest"} className="categorie-box">
            <img
              src="https://img.youtube.com/vi/iKkLgisb6xU/mqdefault.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "latest"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              తాజా వీడియోలు
            </h3>
          </Link>
          <Link to={"/videos?subcategory=trailers"} className="categorie-box">
            <img
              src="https://img.youtube.com/vi/l8qlUDRSaTU/mqdefault.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "trailers"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              ట్రైలర్స్
            </h3>
          </Link>
          <Link to={"/videos?subcategory=video_songs"} className="categorie-box">
            <img
              src="https://img.youtube.com/vi/c2nHxn2P5EU/mqdefault.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "video_songs"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              వీడియో సాంగ్స్
            </h3>
          </Link>
          <Link
            to={"/videos?subcategory=lyrical_songs"}
            className="categorie-box"
          >
            <img
              src="https://img.youtube.com/vi/4vrajmQSRMY/mqdefault.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "lyrical_songs"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              లిరికల్ సాంగ్స్
            </h3>
          </Link>
          <Link
            to={"/videos?subcategory=ott"}
            className="categorie-box"
          >
            <img
              src="https://img.youtube.com/vi/45217MT60-U/maxresdefault.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "ott"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              ఓటిటి
            </h3>
          </Link>
          <Link
            to={"/videos?subcategory=events"}
            className="categorie-box"
          >
            <img
              src="https://img.youtube.com/vi/DHomAM5Qg8M/mqdefault.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "events"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              ఈవెంట్స్
            </h3>
          </Link>
          <Link
            to={"/videos?subcategory=shows"}
            className="categorie-box"
          >
            <img
              src="https://img.youtube.com/vi/bHWBtvz6mZI/mqdefault.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "shows"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              షోస్
            </h3>
          </Link>
        </div>
        <div className="videos-page-container">
          <AllVideos />
        </div>
      </div>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Videos;
