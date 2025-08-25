import React, { useState } from "react";
import Footer from "../components/footer/Footer";
import TabTitle from "../components/titles/TabTitle";
import Navbar from "../components/navbar/Navbar";
import { toast } from "react-toastify";
import { contactUsEmail } from "../helper/apis";

const ContactUs = () => {
  document.title = "టీ టైమ్ తెలుగు - మమ్మల్ని సంప్రదించండి";

  const [data, setData] = useState({
    email: "",
    fullName: "",
    subject: "",
    message: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await contactUsEmail(data);
      if (res?.status === "success") {
        toast.success(res?.message);
        setData({
          email: "",
          fullName: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="contactus-page main-page padding-main">
        <TabTitle title={"మమ్మల్ని సంప్రదించండి"} />
        <div className="contactus-page-container">
          <div className="contactus-section">
            <h1>మమ్మల్ని సంప్రదించండి</h1>
            <p>టీ టైమ్ తెలుగు బృందం మీ అభిప్రాయాలు మరియు సూచనలను స్వాగతిస్తుంది.</p>
            <div className="contactus-container">
              <div className="contactus-contact-info">
                <h3 className="contactus-title">సంప్రదించండి </h3>
                <p className="contactus-text"></p>

                <div className="contactus-info">
                  <div className="contactus-information">
                    <i className="fa fa-location-dot contactus-icon"></i>
                    <div className="">
                      <p>USA</p>{" "}
                      <p>
                        1000 Bearcat Way Suite 105 Unit 5 Morrisville NC 27560
                      </p>
                    </div>
                  </div>
                  <div className="contactus-information">
                    <i className="fa fa-envelope contactus-icon"></i>
                    <p>hr@eagleiitech.com</p>
                  </div>
                  <div className="contactus-information">
                    <i className="fa fa-phone contactus-icon"></i>
                    <p>(919) 439-6578</p>
                  </div>
                </div>

                <div className="contactus-social-media">
                  <p>సోషల్ మీడియా ఖాతాలు :</p>
                  <div className="contactus-social-icons">
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

              <div className="contactus-contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="contactus-input-container">
                    <input
                      type="text"
                      name="fullName"
                      className="contactus-input"
                      value={data?.fullName}
                      onChange={handleChange}
                    />
                    <span>పూర్తి పేరు</span>
                  </div>
                  <div className="contactus-input-container">
                    <input
                      type="email"
                      name="email"
                      className="contactus-input"
                      value={data?.email}
                      onChange={handleChange}
                    />
                    <span>ఇ-మెయిల్</span>
                  </div>
                  <div className="contactus-input-container">
                    <input
                      type="text"
                      name="subject"
                      className="contactus-input"
                      value={data?.subject}
                      onChange={handleChange}
                    />
                    <span>విషయం</span>
                  </div>
                  <div className="contactus-input-container textarea">
                    <textarea
                      name="message"
                      className="contactus-input"
                      value={data?.message}
                      onChange={handleChange}
                    ></textarea>
                    <span>సందేశం</span>
                  </div>
                  <input
                    type="submit"
                    value="సందేశం పంపండి"
                    className="contactus-btn"
                  />
                </form>
              </div>
            </div>

            <div className="das-my20">
              <h1>మేము ఇక్కడ ఉన్నాము</h1>
            </div>
            <div className="contactus-map-container das-my20">
              <iframe
                loading="lazy"
                src="https://maps.google.com/maps?q=1000%20Bearcat%20Way%20Suite%20105%20Unit%205%20Morrisville%20NC%2027560&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near"
                title="1000 Bearcat Way Suite 105 Unit 5 Morrisville NC 27560"
                aria-label="1000 Bearcat Way Suite 105 Unit 5 Morrisville NC 27560"
                style={{ border: "0" }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
