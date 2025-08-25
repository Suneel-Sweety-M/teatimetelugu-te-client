import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../titles/SectionTitle";
import { getTrendsPosts } from "../../helper/apis";
import moment from "moment";

const GridView = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  const allNews = async () => {
    try {
      const res = await getTrendsPosts();
      if (res?.status === "success") {
        setNews(res?.news.reverse()); // Reverse the news array to show latest first
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    allNews();
  }, []);

  return (
    <section className="grid-view-container">
      <SectionTitle title="Latest Movies" />
      {isLoading ? (
        <div className="grid-view">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <article className="movie-card" key={index}>
                <div className="movie-link">
                  <figure className="movie-image-container">
                    <img
                      src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                      alt="img"
                      loading="lazy"
                      className="movie-image"
                    />
                  </figure>
                  <div className="snlc-title p20">
                    <div className="snlc-text"></div>
                    <div className="snlc-half-text"></div>
                  </div>
                </div>
              </article>
            ))}
        </div>
      ) : (
        <div className="grid-view">
          {news.slice(5, 11).map((movie) => (
            <article key={movie?._id} className="movie-card">
              <Link
                to={`/${movie?.category?.en}/${movie?.newsId}`}
                className="movie-link"
              >
                <figure className="movie-image-container">
                  <img
                    src={movie?.mainUrl}
                    alt={movie?.title?.te}
                    loading="lazy"
                    className="movie-image"
                  />
                </figure>
                <div className="movie-content">
                  <span className="movie-meta">
                    {movie?.category?.te} /{" "}
                    {moment(movie?.createdAt).format("MMM DD, YYYY")}
                  </span>
                  <h3 className="movie-title">{movie?.title?.te}</h3>
                  {/* <p
                    className="movie-description dynamic-desc"
                    dangerouslySetInnerHTML={{
                      __html: movie?.description,
                    }}
                  /> */}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default GridView;
