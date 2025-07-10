import React, { useEffect, useState } from "react";
import "../components/category/category.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import TabTitle from "../components/titles/TabTitle";
import AllCategories from "../components/category/AllCategories";
import CategoryPosts from "../components/category/CategoryPosts";
import { useParams } from "react-router-dom";
import { getCategoryLongAd, getCategoryShortAd } from "../helper/apis";
import { toast } from "react-toastify";

const Category = () => {
  const { category } = useParams();
  const [categoryLongAdImg, setCategoryLongAdImg] = useState("");
  const [categoryLongAdLink, setCategoryLongAdLink] = useState("");
  const [categoryShortAdImg, setCategoryShortAdImg] = useState("");
  const [categoryShortAdLink, setCategoryShortAdLink] = useState("");
  const [title, setTitle] = useState("");

  const handleGetCategoryLongAd = async () => {
    const res = await getCategoryLongAd();

    if (res?.status === "success") {
      setCategoryLongAdImg(res?.categoryLongAd?.img);
      setCategoryLongAdLink(res?.categoryLongAd?.link);
    } else {
      toast.error(res?.message);
    }
  };

  const handleGetCategoryShortAd = async () => {
    const res = await getCategoryShortAd();

    if (res?.status === "success") {
      setCategoryShortAdImg(res?.categoryShortAd?.img);
      setCategoryShortAdLink(res?.categoryShortAd?.link);
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    handleGetCategoryLongAd();
    handleGetCategoryShortAd();
  }, []);

  useEffect(() => {
    if (category === "movies") {
      setTitle("సినిమా వార్తలు");
    } else if (category === "politics") {
      setTitle("రాజకీయ వార్తలు");
    } else if (category === "gossips") {
      setTitle("గాసిప్స్");
    } else if (category === "ott") {
      setTitle("OTT వార్తలు");
    } else if (category === "gallery") {
      setTitle("గ్యాలరీ");
    } else if (category === "videos") {
      setTitle("వీడియోలు");
    } else if (category === "reviews") {
      setTitle("సినిమా సమీక్షలు");
    } else {
      setTitle(category);
    }
  }, [category]);

  return (
    <>
      <Navbar />
      <div className="category-page main-page">
        <TabTitle title={title} />
        <AllCategories />
        <a href={categoryShortAdLink} target="blank" className="">
          <img
            className="ad-img"
            src={
              categoryShortAdImg ||
              "https://res.cloudinary.com/demmiusik/image/upload/v1741353445/Ad1_ykrrgv.png"
            }
            alt="ad-img"
          />
        </a>
        <CategoryPosts />
        <a href={categoryLongAdLink} target="blank" className="">
          <img
            className="ad-img"
            src={
              categoryLongAdImg ||
              "https://res.cloudinary.com/demmiusik/image/upload/v1741353445/Ad1_ykrrgv.png"
            }
            alt="ad-img"
          />
        </a>
      </div>
      <Footer />
    </>
  );
};

export default Category;
