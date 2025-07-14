import React from "react";
import style from "./CategorySlider.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Spinner from "../Spinner/Spinner";
import useApi from "../../Hooks/useApi";

export default function CategorySlider() {
  const [allCategories, setAllCategories] = useState(null);

  var settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 8,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
          autoplay: true,
          infinite: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };

  // ! Using Custom Hook
  let { data, isError, error, isLoading } = useApi("categories");
  // console.log(data?.data?.data);

  // ***************************************************************

  // ! Using Function $ useEffect
  // function getAllCategories() {
  //   axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/categories`)
  //     .then(({ data }) => {
  //       // console.log(data?.data);
  //       setAllCategories(data?.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // useEffect(() => {
  //   getAllCategories();
  // }, []);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h2>Error...</h2>;
  }

  return (
    <>
      <div className="slider mx-auto">
        <h2 className="mb-10 mt-5 font-medium text-xl md:text-4xl text-green-800 text-center">
          Shop Popular Categories
        </h2>
        <Slider {...settings}>
          {data?.data?.data?.map((category) => {
            return (
              <div className="p-0.5">
                <img
                  src={category?.image}
                  className="h-[170px] w-48 object-fill"
                  alt={category.name}
                />
                <h3>{category?.name}</h3>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
