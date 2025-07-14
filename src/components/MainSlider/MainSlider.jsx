import React from "react";
import style from "./MainSlider.module.css";
import { useEffect } from "react";
import { useState } from "react";
import img1 from "../../assets/images/grocery-banner.png";
import img2 from "../../assets/images/grocery-banner-2.jpeg";
import img3 from "../../assets/images/slider-2.jpeg";
import img4 from "../../assets/images/slider-image-1.jpeg";
import img5 from "../../assets/images/slider-image-2.jpeg";
import img6 from "../../assets/images/slider-image-3.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  const [counter, setCounter] = useState(0);

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  useEffect(() => {}, []);
  return (
    <>
      <div className="flex flex-wrap w-9/10 mx-auto my-8">
        <div className="w-3/4">
          <Slider {...settings}>
            <img className="h-40 md:h-72 object-cover" src={img3} alt="" />
            <img className="h-40 md:h-72 object-cover" src={img4} alt="" />
            <img className="h-40 md:h-72 object-cover" src={img5} alt="" />
            <img className="h-40 md:h-72 object-cover" src={img6} alt="" />
          </Slider>
        </div>
        <div className="w-1/4">
          <img className="h-20 md:h-36 object-cover w-full" src={img1} alt="" />
          <img className="h-20 md:h-36 object-cover w-full" src={img2} alt="" />
        </div>
      </div>
    </>
  );
}
