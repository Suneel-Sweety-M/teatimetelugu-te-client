import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import TabTitle from "../components/titles/TabTitle";
import { adWithUsEmail } from "../helper/apis";
import { toast } from "react-toastify";

const AdWithUs = () => {
  const [activePage, setActivePage] = useState("Navbar");
  const [adSize, setAdSize] = useState("Ad (748px X 78px)");

  // Page options data
  const pageOptions = [
    { id: "Navbar", label: "Navbar" },
    { id: "Home", label: "Home" },
    { id: "Category", label: "Category" },
    { id: "Single News", label: "Single News" },
    { id: "Single Video", label: "Single Video" },
  ];

  // Ad size options mapped by page
  const adSizeOptions = {
    Navbar: ["Ad (748px X 78px)"],
    Home: [
      "Popup Ad (1000px X 600px)",
      "Ad (1200px X 900px)",
      "Ad (336px X 280px)",
    ],
    Category: ["Ad (1200px X 100px)", "Ad (1200px X 190px)"],
    "Single News": ["Ad (336px X 280px)"],
    "Single Video": ["Ad (348px X 348px)"],
  };

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
    if (adSize === "") {
      toast.info("Select Ad size.");
      return;
    }
    try {
      const res = await adWithUsEmail({ ...data, page: activePage, adSize });
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

  document.title = "మాతో ప్రకటనలు చేయండి";

  return (
    <>
      <Navbar />
      <div className="adwithus-page main-page padding-page">
        <TabTitle title={"మాతో ప్రకటనలు చేయండి"} />
        <div className="adwithus-container">
          <div className="adwithus-section">
            <p className="adwithus-intro">
              మీ ప్రకటనను ఎక్కడ ఉంచాలనుకుంటున్నారో ఎంచుకోండి. మా వద్ద విభిన్న
              పేజీలకు విభిన్న పరిమాణాల్లో ప్రకటన స్థలాలు ఉన్నాయి. మీరు ప్రకటన
              ఉంచదలచిన పేజీ మరియు ప్రకటన పరిమాణం ఎంచుకుని, కింది ఫారమ్‌లో మీ
              ప్రకటన వివరాలను నమోదు చేయండి. మేము వీలైనంత త్వరగా మిమ్మల్ని
              సంప్రదిస్తాము.
            </p>

            <div className="adwithus-section-block">
              <h2>పేజీని ఎంచుకోండి</h2>
              <div className="adwithus-ad-pages">
                {pageOptions.map((page) => (
                  <button
                    key={page.id}
                    className={`adwithus-ad-page ${
                      activePage === page.id ? "adwithus-ad-page-active" : ""
                    }`}
                    onClick={() => {
                      setActivePage(page.id);
                      setAdSize(adSizeOptions[page.id][0]);
                    }}
                  >
                    {page.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="adwithus-section-block">
              <h2>ప్రకటన పరిమాణాన్ని ఎంచుకోండి</h2>
              <div className="adwithus-ad-templates">
                {adSizeOptions[activePage].map((size) => (
                  <button
                    key={size}
                    className={`adwithus-ad-template ${
                      adSize === size ? "adwithus-ad-template-active" : ""
                    }`}
                    onClick={() => setAdSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="adwithus-section-block">
              <h2>సంప్రదింపు సమాచారం</h2>
              <div className="adwithus-contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="fullName">పూర్తి పేరు</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="form-input"
                      value={data?.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">ఇమెయిల్</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={data?.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">విషయం</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-input"
                      value={data?.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group textarea">
                    <label htmlFor="message">సందేశం</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-input contactus-input"
                      value={data?.message}
                      onChange={handleChange}
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-btn">
                    సందేశం పంపండి
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdWithUs;
