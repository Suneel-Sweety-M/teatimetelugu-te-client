import { Link, useParams } from "react-router-dom";

const AllCategories = () => {
  const { category } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const subcategory = queryParams.get("subcategory") || "";

  return (
    <>
      {category === "news" && (
        <div className="all-categories-container">
          <Link to={"/news?subcategory=ap"} className="categorie-box">
            <img
              src="https://jswtv.tv/wp-content/uploads/2022/07/YS-Jagan-hits-it-out-against-Pawan-Kalyan-Chandrababu.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "ap"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              ఆంధ్రప్రదేశ్
            </h3>
          </Link>
          <Link to={"/news?subcategory=ts"} className="categorie-box">
            <img
              src="https://cdn.siasat.com/wp-content/uploads/2023/12/Untitled-design-2023-12-16T214309.488.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "ts"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              తెలంగాణ
            </h3>
          </Link>
          <Link to={"/news?subcategory=national"} className="categorie-box">
            <img
              src="https://c.ndtvimg.com/gws/ms/10-politicians-who-will-drive-the-narrative-in-2024-elections/assets/1.jpeg?1711777573"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "national"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              జాతీయ
            </h3>
          </Link>
          <Link
            to={"/news?subcategory=international"}
            className="categorie-box"
          >
            <img
              src="https://i.ndtvimg.com/i/2018-04/pm-modi-xi-jinping-pti_650x400_71524879810.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "international"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              అంతర్జాతీయ
            </h3>
          </Link>
        </div>
      )}

      {category === "politics" && (
        <div className="all-categories-container">
          <Link to={"/politics?subcategory=ap"} className="categorie-box">
            <img
              src="https://jswtv.tv/wp-content/uploads/2022/07/YS-Jagan-hits-it-out-against-Pawan-Kalyan-Chandrababu.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "ap"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              ఆంధ్రప్రదేశ్
            </h3>
          </Link>
          <Link to={"/politics?subcategory=ts"} className="categorie-box">
            <img
              src="https://cdn.siasat.com/wp-content/uploads/2023/12/Untitled-design-2023-12-16T214309.488.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "ts"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              తెలంగాణ
            </h3>
          </Link>
          <Link to={"/politics?subcategory=national"} className="categorie-box">
            <img
              src="https://c.ndtvimg.com/gws/ms/10-politicians-who-will-drive-the-narrative-in-2024-elections/assets/1.jpeg?1711777573"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "national"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              జాతీయ
            </h3>
          </Link>
          <Link
            to={"/politics?subcategory=international"}
            className="categorie-box"
          >
            <img
              src="https://i.ndtvimg.com/i/2018-04/pm-modi-xi-jinping-pti_650x400_71524879810.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "international"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              అంతర్జాతీయ
            </h3>
          </Link>
        </div>
      )}

      {category === "movies" && (
        <div className="all-categories-container">
          <Link to={"/movies?subcategory=tollywood"} className="categorie-box">
            <img
              src="https://magicalassam.com/wp-content/uploads/2022/04/Superstars-of-the-South-Charge-Per-Film.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "tollywood"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              టాలీవుడ్
            </h3>
          </Link>
          <Link to={"/movies?subcategory=bollywood"} className="categorie-box">
            <img
              src="https://imgeng.jagran.com/images/2023/may/Not%20Salman%20Ranbir%20Kapoor%20to%20star%20in%20Aamir%20Khan%20film1685423743863.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "bollywood"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              బాలీవుడ్
            </h3>
          </Link>
          <Link to={"/movies?subcategory=hollywood"} className="categorie-box">
            <img
              src="https://assets.entrepreneur.com/content/3x2/2000/20160809061411-Avengers.jpeg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "hollywood"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              హాలీవుడ్
            </h3>
          </Link>
          <Link to={"/movies?subcategory=south"} className="categorie-box">
            <img
              src="https://webbspy.com/wp-content/uploads/2021/08/Kollywood-Actors.png"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "south"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              సౌత్
            </h3>
          </Link>
          {/* <Link to={"/movies?subcategory=north"} className="categorie-box">
            <img
              src="https://sm.mashable.com/t/mashable_in/photo/default/ranbir-hrithik_uc6u.1248.jpg"
              alt="category-img"
            />
            <h3 className="category-title text-capital"> నార్త్ </h3>
          </Link>*/}
          <Link
            to={"/movies?subcategory=collections"}
            className="categorie-box"
          >
            <img
              src="https://www.valentinemultiplex.com/images/main-slider/2.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "collections"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              కలెక్షన్స్{" "}
            </h3>
          </Link>
          {/*  <Link to={"/movies?subcategory=trailer"} className="categorie-box">
            <img
              src="https://i.ytimg.com/vi/JMWO8ZeP0RM/maxresdefault.jpg"
              alt="category-img"
            />
            <h3 className="category-title text-capital">ట్రైలర్లు</h3>
          </Link> */}
        </div>
      )}

      {category === "gossips" && (
        <div className="all-categories-container">
          <Link
            to={"/gossips?subcategory=ap-political"}
            className="categorie-box"
          >
            <img
              src="https://jswtv.tv/wp-content/uploads/2022/07/YS-Jagan-hits-it-out-against-Pawan-Kalyan-Chandrababu.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "ap-political"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              ఆంధ్రప్రదేశ్
            </h3>
          </Link>
          <Link
            to={"/gossips?subcategory=ts-political"}
            className="categorie-box"
          >
            <img
              src="https://cdn.siasat.com/wp-content/uploads/2023/12/Untitled-design-2023-12-16T214309.488.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "ts-political"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              తెలంగాణ
            </h3>
          </Link>
          <Link to={"/gossips?subcategory=movies"} className="categorie-box">
            <img
              src="https://magicalassam.com/wp-content/uploads/2022/04/Superstars-of-the-South-Charge-Per-Film.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "movies"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              సినిమాలు
            </h3>
          </Link>
        </div>
      )}

      {category === "ott" && (
        <div className="all-categories-container">
          <Link to={"/ott?subcategory=review"} className="categorie-box">
            <img
              src="https://eetnews.s3.amazonaws.com/uploads/1730080556547_ott-this-week.webp"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "review"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              సమీక్షలు
            </h3>
          </Link>
          <Link to={"/ott?subcategory=release"} className="categorie-box">
            <img
              src="https://cdn.gulte.com/wp-content/uploads/2024/10/Screenshot-2024-10-12-at-11.30.28.png"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "release"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              విడుదల
            </h3>
          </Link>
        </div>
      )}

      {category === "sports" && (
        <div className="all-categories-container">
          <Link to={"/sports?subcategory=cricket"} className="categorie-box">
            <img
              src="https://www.indiaeveryday.com/wp-content/uploads/2024/01/India-Cricket-World-Cup-history.webp"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "cricket"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              క్రికెట్
            </h3>
          </Link>
          <Link to={"/sports?subcategory=football"} className="categorie-box">
            <img
              src="https://static.toiimg.com/thumb/imgsize-68734,msid-105049830,width-650,resizemode-4/105049830.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "football"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              ఫుట్‌బాల్
            </h3>
          </Link>
          <Link to={"/sports?subcategory=olympics"} className="categorie-box">
            <img
              src="https://e1.365dm.com/23/02/1600x900/skysports-paris-olympics-rings_6052203.jpg"
              alt="category-img"
            />
            <h3
              className={
                subcategory === "olympics"
                  ? "category-title-active category-title text-capital"
                  : "category-title text-capital"
              }
            >
              ఒలింపిక్స్
            </h3>
          </Link>
        </div>
      )}
    </>
  );
};

export default AllCategories;
