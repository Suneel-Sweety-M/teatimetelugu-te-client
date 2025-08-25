import React, { useEffect, useState } from "react";
import SectionTitle from "../titles/SectionTitle";
import { toast } from "react-toastify";
import { getMovieCollections } from "../../helper/apis";

const MovieCollections = () => {
  const [allCollections, setAllCollections] = useState([]);
  const [collectionsCategory, setCollectionsCategory] =
    useState("1st-day-ap&ts");

  const getCollections = async () => {
    try {
      const res = await getMovieCollections();
      if (res?.status === "success") {
        setAllCollections(res?.movieCollections);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);
  return (
    <>
      <div className="movie-schedules-container">
        <SectionTitle title={"సినిమా సేకరణలు"} />
        <div className="movie-schedules-section">
          <div className="current-schedules">
            <span
              style={{
                backgroundColor:
                  collectionsCategory === "1st-day-ap&ts" ? "red" : undefined,
                color:
                  collectionsCategory === "1st-day-ap&ts" ? "#fff" : undefined,
              }}
              onClick={() => setCollectionsCategory("1st-day-ap&ts")}
              className="ms-text"
            >
              1వ రోజు AP&TS
            </span>
            <span
              style={{
                backgroundColor:
                  collectionsCategory === "1st-day-ww" ? "red" : undefined,
                color:
                  collectionsCategory === "1st-day-ww" ? "#fff" : undefined,
              }}
              onClick={() => setCollectionsCategory("1st-day-ww")}
              className="ms-text"
            >
              1వ రోజు WW
            </span>
            <span
              style={{
                backgroundColor:
                  collectionsCategory === "closing-ww" ? "red" : undefined,
                color:
                  collectionsCategory === "closing-ww" ? "#fff" : undefined,
              }}
              onClick={() => setCollectionsCategory("closing-ww")}
              className="ms-text"
            >
              1వ రోజు WW 
            </span>
          </div>
          <div className="schedules-list">
            <div className="schedules-list-item">
              <span
                style={{ color: "red", fontWeight: "500" }}
                className="ms-text"
              >
                పేరు
              </span>
              <span
                style={{ color: "red", fontWeight: "500" }}
                className="ms-text"
              >
                సేకరణలు
              </span>
            </div>

             {allCollections?.map((item, index) => (
            <div
              className="schedules-list-item"
              key={index}
              style={{
                display: collectionsCategory !== item?.category && "none",
              }}
            >
              <span className="text-center ms-text">{item?.movie?.te}</span>
              <span className="ms-text">₹ {item?.amount?.te}</span>
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCollections;
