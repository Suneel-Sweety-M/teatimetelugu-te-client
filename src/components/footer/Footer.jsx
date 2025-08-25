import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="main-page">
      <div className="footer-log-section">
        <span className="footer-logo">
          <img src="/assets/new-ttt-logo.jpg" alt="logo" />
        </span>
        <div className="footer-socials">
          <Link to="/about-us">మా గురించి</Link>
          <Link to="/contact-us">మమ్మల్ని సంప్రదించండి</Link>
          <Link to="/privacy-policy">గోప్యతా విధానం</Link>
          <Link to="/adwithus">మాతో ప్రకటన</Link>
        </div>
      </div>
      <div className="copyright-section">
        <span className="copyright-text">
          కాపీరైట్ © 2025 అన్ని హక్కులు{" "}
          <a href="https://eagleiitech.com" target="blank">
            ఈగల్ ఐ టెక్నాలజీస్ (Eagle Eye Technologies)
          </a>
          {" "}సొంతం.
        </span>
        <div className="minbar-socials">
          <a
            href="https://www.facebook.com/profile.php?id=61572501587074"
            target="blank"
          >
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://www.youtube.com/@TeaTimeTelugu-s8b" target="blank">
            <i className="fa fa-youtube"></i>
          </a>
          <a href="https://x.com/TeaTimeTelugu" target="blank">
            <i className="fa fa-x"></i>
          </a>
          <a href="https://www.instagram.com/teatime_telugu/" target="blank">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
