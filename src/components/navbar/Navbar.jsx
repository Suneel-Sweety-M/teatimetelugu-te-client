import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Youtube from "../youtube/Youtube";
import { useDispatch, useSelector } from "react-redux";
import { getNavbarAd, logoutUser } from "../../helper/apis";
// import { login } from "../../redux/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useSelector((state) => state.te_teatimetelugu);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [seePassword, setSeePassword] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  // const [isUserJoin, setIsUserJoin] = useState(true);
  const [yTurl, setYTurl] = useState("");
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState("");
  // const [data, setData] = useState({
  //   email: "",
  //   password: "",
  // });
  const [navbarAdImg, setNavbarAdImg] = useState("");
  const [navbarAdLink, setNavbarAdLink] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutPopup, setLogoutPopup] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutCancel = () => {
    setLogoutPopup(false);
  };

  const isActive = (path) => location.pathname === path;

  const handleGetNavbarAd = async () => {
    const res = await getNavbarAd();
    if (res?.status === "success") {
      setNavbarAdImg(res?.navbarAd?.img);
      setNavbarAdLink(res?.navbarAd?.link);
    } else {
      toast.error(res?.message);
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData({
  //     ...data,
  //     [name]: value,
  //   });
  // };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   try {
  //     const res = await loginUser(data);

  //     if (res?.status === "fail") {
  //       toast.error(res?.message || "Error");
  //     } else if (res?.status === "success") {
  //       toast.success(res?.message || "Success");
  //       const newData = {
  //         user: res?.user,
  //       };

  //       dispatch(login(newData));
  //       setIsJoin(false);
  //       setData({
  //         email: "",
  //         password: "",
  //       });
  //     } else {
  //       toast.info(res?.message || "Info");
  //     }
  //     setIsSubmitting(false);
  //   } catch (error) {
  //     console.log(error);
  //     setIsSubmitting(false);
  //   }
  // };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser(dispatch, navigate);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingOut(false);
      setLogoutPopup(false);
    }
  };

  const onSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!searchText) {
        toast.info("Search something!");
        return;
      }

      navigate(`/search?q=${encodeURIComponent(searchText)}`);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Error during search submission:", error);
    }
  };

  useEffect(() => {
    function getFormattedDate() {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const today = new Date();
      setDate(today.toLocaleDateString("te-IN", options));
    }
    getFormattedDate();
    handleGetNavbarAd();
  }, []);

  return (
    <>
      <div className="main-page">
        <div className="navbar-section">
          <div className="navbar-top-minibar main-padding">
            <div className="navbar-top-minibar-left">
              <div className="minbar-date">
                <i className="fa-regular fa-calendar-days"></i>
                {date}
              </div>
              <div className="minibar-left-tabs">
                {!user && (
                  <span
                    className="cursor-pointer"
                    onClick={() => setIsJoin(true)}
                  >
                    లాగిన్
                  </span>
                )}

                <Link to={"/about-us"} className="mx10">
                  మా గురించి
                </Link>
                <Link to={"/contact-us"} className="mx10">
                  మమ్మల్ని సంప్రదించండి
                </Link>
                <Link to={"/adwithus"} className="mx10">
                  మాతో ప్రకటన
                </Link>
              </div>
            </div>
            <div className="navbar-top-minibar-right">
              <div className="minbar-socials">
                <a
                  href="https://www.facebook.com/profile.php?id=61572501587074"
                  target="blank"
                >
                  <i className="fa fa-facebook"></i>
                </a>
                <a
                  href="https://www.youtube.com/@TeaTimeTelugu-s8b"
                  target="blank"
                >
                  <i className="fa fa-youtube"></i>
                </a>
                <a href="https://x.com/TeaTimeTelugu" target="blank">
                  <i className="fa fa-x"></i>
                </a>
                <a
                  href="https://www.instagram.com/teatime_telugu/"
                  target="blank"
                >
                  <i className="fa fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-logo-section">
            <Link to="/" className="navbar-logo-section-left">
              <img src="/assets/new-ttt-logo.jpg" alt="logo" />
            </Link>
            <a
              href={navbarAdLink}
              target="blank"
              className="navbar-logo-section-right"
            >
              <img
                src={
                  navbarAdImg ||
                  "https://res.cloudinary.com/demmiusik/image/upload/v1746878560/pccjt7szazjq1szr5xmj.png"
                }
                alt="ad"
              />
            </a>
          </div>

          <div className="navbar-pages-section">
            <div className="navbar-pages-section-left">
              <div className="navbar-all-tabs">
                <Link
                  to="/"
                  className={`cp nav-tab ${isActive("/") ? "active-tab" : ""}`}
                >
                  హోమ్
                </Link>
                <Link
                  to="/news"
                  className={`cp nav-tab ${
                    isActive("/news") ? "active-tab" : ""
                  }`}
                >
                  జనరల్
                </Link>
                <Link
                  to="/politics"
                  className={`cp nav-tab ${
                    isActive("/politics") ? "active-tab" : ""
                  }`}
                >
                  రాజకీయం
                </Link>
                <Link
                  to="/movies"
                  className={`cp nav-tab ${
                    isActive("/movies") ? "active-tab" : ""
                  }`}
                >
                  సినిమా
                </Link>
                <Link
                  to="/gossips"
                  className={`cp nav-tab ${
                    isActive("/gossips") ? "active-tab" : ""
                  }`}
                >
                  గాసిప్స్
                </Link>
                <Link
                  to="/reviews"
                  className={`cp nav-tab ${
                    isActive("/reviews") ? "active-tab" : ""
                  }`}
                >
                  రివ్యూస్
                </Link>
                <Link
                  to="/gallery"
                  className={`cp nav-tab 
                ${isActive("/gallery") ? "active-tab" : ""}`}
                >
                  ఫోటో గ్యాలరీ
                </Link>
                <Link
                  to="/videos"
                  className={`cp nav-tab 
                ${isActive("/videos") ? "active-tab" : ""}`}
                >
                  వీడియోలు
                </Link>
                <Link
                  to="/ott"
                  className={`cp nav-tab ${
                    isActive("/ott") ? "active-tab" : ""
                  }`}
                >
                  ఓటిటి
                </Link>
                <Link
                  to="/sports"
                  className={`cp nav-tab ${
                    isActive("/sports") ? "active-tab" : ""
                  }`}
                >
                  క్రీడలు
                </Link>
              </div>
            </div>

            <div className="navbar-pages-section-right">
              <div className="navbar-pages-section-right-items">
                <a href="https://teatimetelugu.com" target="blank">
                  <b>ENGLISH</b>
                </a>

                <Link to={"/search"}>
                  <i className="fa-solid fa-magnifying-glass cp"></i>
                </Link>

                {user ? (
                  <div className="navbar-logout">
                    <i
                      className="fa-solid fa-right-from-bracket cp"
                      onClick={() => setLogoutPopup(true)}
                    ></i>
                  </div>
                ) : (
                  <span
                    className="cursor-pointer"
                    onClick={() => setIsJoin(true)}
                  >
                    <i className="fa-solid fa-right-to-bracket cp"></i>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="navbar-logos-section">
            <a href="https://eenadu.net" target="blank" className="nls-logo">
              <img src="/logos/eenadu.jpg" alt="" />
            </a>
            <a
              href="https://andhrajyothi.com"
              target="blank"
              className="nls-logo"
            >
              <img src="/logos/andhrajyothi.jpg" alt="" />
            </a>
            <a href="https://sakshi.com" target="blank" className="nls-logo">
              <img src="/logos/sakshi.jpg" alt="" />
            </a>
            <a href="https://ntnews.com" target="blank" className="nls-logo">
              <img src="/logos/nt.jpg" alt="" />
            </a>
            <a
              href="https://www.youtube.com/watch?v=ZeukNjINwjo"
              target="blank"
              className="nls-logo cp"
            >
              <img src="/logos/etv.jpg" alt="" />
            </a>
            <span
              onClick={() =>
                setYTurl("https://www.youtube.com/embed/II_m28Bm-iM")
              }
              className="nls-logo cp"
            >
              <img src="/logos/tv9.jpg" alt="" />
            </span>
            <span
              onClick={() =>
                setYTurl("https://www.youtube.com/embed/L0RktSIM980")
              }
              className="nls-logo cp"
            >
              <img src="/logos/ntv.jpg" alt="" />
            </span>
            <span
              onClick={() =>
                setYTurl("https://www.youtube.com/embed/HoYsWagMFfE")
              }
              className="nls-logo cp"
            >
              <img src="/logos/abn.png" alt="" />
            </span>
            <span
              onClick={() =>
                setYTurl("https://www.youtube.com/embed/nrb8P8shbDk")
              }
              className="nls-logo cp"
            >
              <img src="/logos/v6.jpg" alt="" />
            </span>
            <a href="https://ndtv.com" target="blank" className="nls-logo">
              <img src="/logos/ndtv.webp" alt="" />
            </a>
            <a href="https://bbc.com" target="blank" className="nls-logo">
              <img src="/logos/bbc.webp" alt="" />
            </a>
            <a href="https://thehindu.com" target="blank" className="nls-logo">
              <img src="/logos/hindu.png" alt="" />
            </a>
            <a href="https://google.com" target="blank" className="nls-logo">
              <img src="/logos/Google.png" alt="" />
            </a>
            <a href="https://facebook.com" target="blank" className="nls-logo">
              <img src="/logos/facebook.png" alt="" />
            </a>
            <a href="https://youtube.com" target="blank" className="nls-logo">
              <img src="/logos/youtube.png" alt="" />
            </a>
            <a href="https://in.yahoo.com" target="blank" className="nls-logo">
              <img src="/logos/yahoo.png" alt="" />
            </a>
            <a href="https://msn.com" target="blank" className="nls-logo">
              <img src="/logos/msn.png" alt="" />
            </a>
            <a href="https://nse-india.com" target="blank" className="nls-logo">
              <img src="/logos/nse.png" alt="" />
            </a>
            <a href="https://bseindia.com" target="blank" className="nls-logo">
              <img src="/logos/bse.jpg" alt="" />
            </a>
            <a
              href="https://espncricinfo.com"
              target="blank"
              className="nls-logo"
            >
              <img src="/logos/cricinfo.png" alt="" />
            </a>
            <a href="https://wikipedia.com" target="blank" className="nls-logo">
              <img src="/logos/wikipedia.jpg" alt="" />
            </a>
            <a href="https://x.com" target="blank" className="nls-logo">
              <img src="/logos/x.jpg" alt="" />
            </a>
          </div>
        </div>

        <div className="mobile-navbar-container">
          <div className="mobile-navbar-header">
            <Link to={"/"} className="mobile-navbar-brand">
              <img
                src="/assets/new-ttt-logo.jpg"
                alt="Tea Time Telugu Logo"
                className="mobile-navbar-logo"
              />
            </Link>
            <button
              className="mobile-navbar-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <i className="fa-solid fa-xmark"></i>
              ) : (
                <i className="fa-solid fa-bars"></i>
              )}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="mobile-navbar-menu">
              <div className="mobile-navbar-menu-inner">
                <Link
                  to="/"
                  className={`mobile-navbar-link ${
                    isActive("/") ? "active-tab" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span>హోమ్</span>
                </Link>
                <Link
                  to="/news"
                  className={`mobile-navbar-link ${
                    isActive("/news") ? "active-tab" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span>జనరల్</span>
                </Link>
                <Link
                  to="/politics"
                  className={`mobile-navbar-link ${
                    isActive("/politics") ? "active-tab" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span>రాజకీయం</span>
                </Link>
                <Link
                  to="/movies"
                  className={`mobile-navbar-link ${
                    isActive("/movies") ? "active-tab" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span>సినిమా</span>
                </Link>
                <Link
                  to="/gossips"
                  className={`mobile-navbar-link ${
                    isActive("/gossips") ? "active-tab" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span>గాసిప్స్</span>
                </Link>
                <Link
                  to="/reviews"
                  className={`mobile-navbar-link ${
                    isActive("/reviews") ? "active-tab" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span>రివ్యూస్</span>
                </Link>
                <Link
                  to="/gallery"
                  className={`mobile-navbar-link ${
                    isActive("/gallery") ? "active-tab" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span>గ్యాలరీ</span>
                </Link>
                <Link
                  to="/videos"
                  className={`mobile-navbar-link ${
                    isActive("/videos") ? "active-tab" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span>వీడియోలు</span>
                </Link>
                <Link
                  to="/ott"
                  className={`mobile-navbar-link ${
                    isActive("/ott") ? "active-tab" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span>ఓటిటి</span>
                </Link>
                <Link
                  to="/sports"
                  className={`mobile-navbar-link ${
                    isActive("/sports") ? "active-tab" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span>క్రీడలు</span>
                </Link>

                <div className="mobile-navbar-divider"></div>

                <a
                  href="https://teatimetelugu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-navbar-link mobile-navbar-link--green"
                >
                  <span>ENGLISH</span>
                </a>

                <div className="mobile-navbar-search">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="mobile-navbar-search-input"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button
                    className="mobile-navbar-search-button"
                    onClick={onSearchSubmit}
                  >
                    <i className="fa fa-magnifying-glass"></i>
                  </button>
                </div>

                {user ? (
                  <button
                    className="mobile-navbar-link mobile-logout-btn mobile-navbar-link--red"
                    onClick={() => {
                      setLogoutPopup(true);
                      setIsMobileMenuOpen(!isMobileMenuOpen);
                    }}
                  >
                    లాగ్ అవుట్
                  </button>
                ) : (
                  <button
                    className="mobile-navbar-link mobile-logout-btn mobile-navbar-link--red"
                    onClick={() => {
                      setIsJoin(true);
                      setIsMobileMenuOpen(!isMobileMenuOpen);
                    }}
                  >
                    లాగిన్
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {isJoin && (
        <div className="popup-container">
          <div className="join-popup">
            <i className="fa fa-xmark" onClick={() => setIsJoin(false)}></i>
            <h1>లాగిన్</h1>
            <a
              href={`${process.env.REACT_APP_API_URL}/auth/join-with-google?client=${process.env.REACT_APP_CLIENT_URL}`}
              className="continue-with-google cursor-pointer"
            >
              <img
                src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0"
                alt="google-logo"
              />
              <h4>Google తో కొనసాగించండి</h4>
            </a>
            {/* <form onSubmit={onSubmit} className="singin-form">
              <div className="join-input">
                <h3 className="">Email</h3>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
              <div className="join-input">
                <h3 className="password-label">Password</h3>
                <i
                  className={
                    seePassword
                      ? "fa fa-eye password-see-hide"
                      : "fa fa-eye-slash password-see-hide"
                  }
                  onClick={() => setSeePassword(!seePassword)}
                ></i>
                <input
                  type={seePassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>
              {!isSubmitting ? (
                <button type="submit" className="login-btn btn">
                  Login
                </button>
              ) : (
                <button
                  type="submit"
                  className="is-submitting-btn login-btn btn"
                >
                  Submitting...
                </button>
              )}
            </form> */}

            {/* <Link
              to={"/forgot-password"}
              className="cp"
              onClick={() => setIsJoin(false)}
            >
              <p>Forgot password?</p>
            </Link> */}
          </div>
        </div>
      )}

      {yTurl !== "" && <Youtube setYTurl={setYTurl} yTurl={yTurl} />}

      {logoutPopup && (
        <div className="logout-popup-container">
          <div className="logout-popup-box">
            <div className="logout-popup-top">
              <div>మీరు ఖచ్చితంగా లాగ్ అవుట్ చేయాలనుకుంటున్నారా?</div>
              <span className="logout-popup-top-x">
                <i
                  className="fa fa-xmark"
                  onClick={() => setLogoutPopup(false)}
                ></i>
              </span>
            </div>
            <div className="logout-popup-bottom">
              <button
                className="logout-popup-btn cancel-btn"
                onClick={handleLogoutCancel}
              >
                లేదు
              </button>
              {!isLoggingOut ? (
                <button
                  className="logout-popup-btn logout-btn"
                  onClick={handleLogout}
                >
                  అవును
                </button>
              ) : (
                <button className="logout-popup-btn loading-btn">
                  అవుట్ అవుతున్నది...
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
