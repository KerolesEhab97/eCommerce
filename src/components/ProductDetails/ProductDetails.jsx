import React, { useContext } from "react";
import style from "./ProductDetails.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../Context/WishlistContext";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [ralatedProducts, setRalatedProducts] = useState(null);
  let { id, category } = useParams();
  // ***************************************************
  let { addToCart } = useContext(CartContext);

  async function addProductToCart(prodId) {
    let response = await addToCart(prodId);
    // console.log(response);
    if (response.data.status === "success") {
      // alert
      toast.success(response?.data?.message, {
        duration: 3000,
        position: "top-right",
      });
    } else {
      // error
      toast.error(response?.data?.message);
    }
  }
  // ***************************************************
  let { addToWishlist } = useContext(WishlistContext);

  async function addProductToWishlist(prodId) {
    let response = await addToWishlist(prodId);
    // console.log(response);
    if (response?.data?.status === "success") {
      // alert
      toast.success(response?.data?.message, {
        duration: 3000,
      });
    } else {
      // error
      toast.error(response?.data?.message);
    }
  }
  // ***************************************************
  function getAllProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        // console.log("allproducts", data?.data);
        // console.log("category", category);
        let ralated = data.data.filter((prod) => {
          return prod.category.name === category;
        });
        setRalatedProducts(ralated);
        // console.log(ralated);
      })
      .catch((error) => {
        // console.log(error);
      });
  }
  // ***************************************************
  var settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  // ***************************************************
  // function getProductDetails() {
  //   axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  //     .then(({ data }) => {
  //       console.log(data?.data);
  //       setProductDetails(data?.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  // ***************************************************
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["details", id],
    queryFn: (x) => {
      // console.log(x.queryKey[1]);
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${x.queryKey[1]}`
      );
      // return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    },
    select: (data) => {
      return data?.data?.data;
    },
  });
  // console.log("productDetails", data);
  // ***************************************************
  useEffect(() => {
    // getProductDetails();
    getAllProducts();
  }, [id]);
  // ***************************************************
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h2>Error...</h2>;
  }
  // ***************************************************
  return (
    <>
      <div className="flex flex-wrap items-center">
        <div className="w-full md:w-1/3 p-10">
          <Slider {...settings}>
            {data?.images.map((src) => {
              return <img src={src} className="w-full" alt={data?.title} />;
            })}
          </Slider>
        </div>
        <div className="w-full md:w-2/3 p-10">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-green-700">
              {data?.title}
            </h3>
            <p className="mt-4 text-slate-900 w-5/6">{data?.description}</p>
            <div className="flex justify-between items-center my-5">
              <span>{data?.price} EGP </span>
              <span>
                <i className="fas fa-star text-yellow-400 me-1"></i>
                {data?.ratingsAverage}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  addProductToCart(data?.id);
                }}
                className="w-5/6 bg-green-600 hover:bg-green-400 transition-colors p-2 rounded-3xl"
              >
                Add To Cart
              </button>
              <i
                onClick={() => {
                  addProductToWishlist(data?.id);
                }}
                className="fa-solid fa-heart text-3xl text-green-900 hover:text-green-600 transition-colors"
              ></i>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button className="w-5/6 bg-blue-600 hover:bg-blue-500 transition-colors p-2 rounded-3xl text-white">
                Check Out
              </button>
              <i className="fa-regular fa-credit-card text-3xl text-blue-900 hover:text-blue-600 transition-colors"></i>
            </div>
          </div>
        </div>
      </div>
      {/* ******************************************************************************** */}

      <h2 className=" font-medium py-3 my-5 text-xl md:text-4xl text-green-800 text-center">
        You might also like
      </h2>
      <div className="flex flex-wrap gap-y-3">
        {ralatedProducts?.map((prod) => {
          return (
            <div
              key={prod.id}
              className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4 mx-auto"
            >
              <div className="product hover:shadow-[0_0_5px_rgba(34,197,94,0.2)] hover:shadow-green-400 transition-all duration-300 rounded-lg hover:p-3 xl:hover:p-1">
                <Link to={`/productDetails/${prod.id}/${prod.category.name}`}>
                  <img className="w-fit mb-2" src={prod.imageCover} alt="" />
                  <span className="text-green-600 ">{prod.category.name}</span>
                  <h3 className="text-lg font-medium h-16 flex items-center">
                    {prod.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between items-center me-2">
                    <span>{prod.price} EGP </span>
                    <span>
                      <i className="fas fa-star text-yellow-400 me-1"></i>
                      {prod.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      addProductToCart(prod.id);
                    }}
                    className="w-5/7 bg-green-600 hover:bg-green-400 transition-colors p-2 rounded-3xl my-2"
                  >
                    Add To Cart
                  </button>
                  <div className="w-1/7">
                    <i
                      onClick={() => {
                        addProductToWishlist(prod.id);
                      }}
                      className="w-full fa-solid fa-heart text-2xl text-green-900 hover:text-green-600 transition-colors"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* ******************************************************************************** */}
    </>
  );
}
