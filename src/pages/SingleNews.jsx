import React, { useCallback, useEffect, useState } from "react";
import "../components/single-news/singleNews.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import LatestStories from "../components/home/LatestStories";
import SectionTitle from "../components/titles/SectionTitle";
import NewsComments from "../components/single-news/NewsComments";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getNewsShortAd, getSingleNews } from "../helper/apis";
import moment from "moment";
import "moment/locale/te";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ScrollTop from "../components/scroll-top/ScrollTop";
import ReadButton from "../components/single-news/ReadButton";

const SingleNews = () => {
  const { id } = useParams();
  const reactionsArray = useSelector(
    (state) => state.te_teatimetelugu.reactions
  );
  const navigate = useNavigate();
  const [news, setNews] = useState({});
  const [suggestedNews, setSuggestedNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [postsCount, setpostsCount] = useState(8);
  // const [reactionsCount, setReactionsCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  const getNews = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getSingleNews(id);
      if (res?.status === "success") {
        setNews(res?.news);
        document.title = `${res?.news?.title?.te}`;
        setSuggestedNews(res?.suggestedNews);
      } else {
        navigate("/");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      navigate("/");
    }
  }, [id, navigate]);

  useEffect(() => {
    getNews();
    moment.locale("te");
  }, [getNews]);

  // const [newsLongAdImg, setNewsLongAdImg] = useState("");
  // const [newsLongAdLink, setNewsLongAdLink] = useState("");
  const [newsShortAdImg, setNewsShortAdImg] = useState("");
  const [newsShortAdLink, setNewsShortAdLink] = useState("");

  // const handleGetNewsLongAd = async () => {
  //   const res = await getNewsLongAd();

  //   if (res?.status === "success") {
  //     setNewsLongAdImg(res?.newsLongAd?.img);
  //     setNewsLongAdLink(res?.newsLongAd?.link);
  //   } else {
  //     toast.error(res?.message);
  //   }
  // };

  const handleGetNewsShortAd = async () => {
    const res = await getNewsShortAd();

    if (res?.status === "success") {
      setNewsShortAdImg(res?.newsShortAd?.img);
      setNewsShortAdLink(res?.newsShortAd?.link);
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    // handleGetNewsLongAd();
    handleGetNewsShortAd();
  }, []);

  return (
    <>
      <Navbar />
      <div className="single-news-page main-page main-padding">
        <div className="single-news-duo">
          {!isLoading ? (
            <div className="single-news-duo-left">
              <div className="single-news-duo-left-top">
                <h1 className="single-news-duo-left-top-title">
                  {news?.title?.te}
                </h1>
                <span className="single-news-duo-left-top-auth-details">
                  <span className="sn-author">
                    రచయిత: <b>{news?.postedBy?.fullName}</b>
                  </span>
                  <span className="sn-posted-date">
                    <i className="fa fa-calendar mr5"></i>
                    {moment(news?.createdAt).format("hh:mm A, D MMMM YYYY")}
                  </span>
                  <span className="sn-posted-date">
                    <i className="fa-regular fa-face-smile mr5"></i>
                    {reactionsArray?.length} <span>స్పందనలు</span>
                  </span>
                  <span className="sn-posted-date">
                    <i className="fa-regular fa-comments mr5"></i>
                    {commentsCount} <span>వ్యాఖ్యలు</span>
                  </span>
                  {news?.newsAudio?.te && <ReadButton news={news} />}
                </span>
                <div className="single-news-content-container">
                  <img src={news?.mainUrl} alt={news?.title?.en} />

                  <div
                    className="single-news-description main-font"
                    dangerouslySetInnerHTML={{ __html: news?.description?.te }}
                  />
                </div>
                {news?.category?.en === "reviews" && (
                  <div className="single-news-rating-container">
                    <h1>టీ టైం తెలుగు రేటింగ్ :</h1>
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={
                          i < news?.movieRating
                            ? "fa-solid fa-star"
                            : "fa-regular fa-star"
                        }
                        style={{ color: "#FFD700", marginRight: "4px" }}
                      ></i>
                    ))}
                  </div>
                )}
              </div>
              <NewsComments
                news={news}
                // getNews={getNews}
                commentsCount={commentsCount}
                setCommentsCount={setCommentsCount}
              />
            </div>
          ) : (
            <div className="single-news-loading-container single-news-duo-left">
              <div className="snlc-title">
                <div className="snlc-text"></div>
                <div className="snlc-text"></div>
                <div className="snlc-half-text"></div>
              </div>
              <div className="snlc-img"></div>
              <div className="snlc-desc">
                <div className="snlc-text"></div>
                <div className="snlc-text"></div>
                <div className="snlc-text"></div>
                <div className="snlc-text"></div>
                <div className="snlc-text"></div>
                <div className="snlc-text"></div>
                <div className="snlc-half-text"></div>
              </div>
            </div>
          )}
          <div className="single-news-duo-right">
            {news?.tags?.te?.length > 0 && (
              <div className="single-news-tags">
                <SectionTitle title={"ట్యాగ్లు"} />
                <div className="sn-all-tags">
                  {news?.tags?.te?.map((tag, index) => (
                    <Link
                      to={`/search?q=${tag}`}
                      className="sn-tag box-shadow"
                      key={index}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="single-news-medias single-news-tags">
              <SectionTitle title={"మమ్మల్ని అనుసరించండి"} />
              <div className="sn-all-tags">
                <a
                  href="https://www.facebook.com/profile.php?id=61572501587074"
                  target="blank"
                  className="sn-social sn-tag box-shadow"
                >
                  <i
                    style={{ color: "#1093f5" }}
                    className="fa fa-facebook"
                  ></i>
                  <span>ఫేస్‌బుక్</span>
                </a>
                <a
                  href="https://www.instagram.com/teatime_telugu"
                  target="blank"
                  className="sn-social sn-tag box-shadow"
                >
                  <i style={{ color: "red" }} className="fa fa-instagram"></i>
                  <span>ఇన్‌స్టాగ్రామ్</span>
                </a>
                <a
                  href="https://www.youtube.com/@TeaTimeTelugu-s8b"
                  target="blank"
                  className="sn-social sn-tag box-shadow"
                >
                  <i style={{ color: "red" }} className="fa fa-youtube"></i>
                  <span>యూట్యూబ్</span>
                </a>
                <a
                  href="https://x.com/TeaTimeTelugu"
                  target="blank"
                  className="sn-social sn-tag box-shadow"
                >
                  <i style={{ color: "#000000" }} className="fa fa-twitter"></i>
                  <span>ట్విట్టర్</span>
                </a>
              </div>
            </div>
            <LatestStories />
            <a href={newsShortAdLink} target="blank">
              <img
                src={
                  newsShortAdImg ||
                  "https://res.cloudinary.com/demmiusik/image/upload/v1741353625/Ad2_jpiggx.png"
                }
                alt="ad"
                className="ad-img br5 cp"
              />
            </a>
          </div>
        </div>

        {suggestedNews?.length > 0 && (
          <div className="latest-collection-container">
            <SectionTitle title="సూచించబడిన పోస్ట్‌లు" />
            {isLoading ? (
              <div className="latest-collection-grid">
                {Array(9)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="latest-collection-card">
                      <div className="latest-collection-image-container">
                        <img
                          src="https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                          alt="pic"
                          loading="lazy"
                          className="latest-collection-image"
                        />
                      </div>
                      <div className="snlc-title p20">
                        <div className="snlc-text"></div>
                        <div className="snlc-half-text"></div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="latest-collection-grid">
                {suggestedNews?.slice(0, 9)?.map((collection) => (
                  <Link
                    to={`/${collection?.category?.en}/${collection?.newsId}`}
                    key={collection?._id}
                    className="latest-collection-card"
                    aria-label={`View ${collection?.title?.en}`}
                  >
                    <div className="latest-collection-image-container">
                      <img
                        src={collection?.mainUrl}
                        alt={collection?.title?.en}
                        loading="lazy"
                        className="latest-collection-image"
                      />
                    </div>
                    <div className="latest-collection-content">
                      <span className="latest-collection-category">
                        {collection?.category?.te}
                      </span>
                      <h3 className="latest-collection-title">
                        {collection?.title?.te}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default SingleNews;
