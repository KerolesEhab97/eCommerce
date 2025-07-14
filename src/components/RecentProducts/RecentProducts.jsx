import React, { useContext } from "react";
import style from "./RecentProducts.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import ProductDetails from "../ProductDetails/ProductDetails";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../Context/WishlistContext";
import useApi from "../../Hooks/useApi";

export default function RecentProducts() {
  const [allProducts, setAllProducts] = useState(null);
  let { addToCart } = useContext(CartContext);

  async function addProductToCart(prodId) {
    let response = await addToCart(prodId);
    // console.log(response);
    if (response.data.status === "success") {
      // alert
      toast.success(response?.data?.message, {
        duration: 3000,
      });
    } else {
      // error
      toast.error(response?.data?.message);
    }
  }
  // ***************************************************************
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
  // ***************************************************************
  // ! Using Custom Hook
  let { data, isError, error, isLoading } = useApi("products");
  // console.log(data?.data?.data);

  // ***************************************************************
  // ! Using Function $ useEffect
  // function getAllProducts() {
  //   axios
  //     .get("https://ecommerce.routemisr.com/api/v1/products")
  //     .then(({ data }) => {
  //       // console.log(data?.data);
  //       setAllProducts(data?.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h2>Error...</h2>;
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search by product name"
        className="py-1.5 ps-3 w-3/4 mx-auto form-control my-10 block border-2 rounded-[8px] border-slate-400"
      />
      <div className="flex flex-wrap gap-y-3">
        {data?.data?.data?.map((prod) => {
          return (
            <div
              key={prod.id}
              className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4 mx-auto"
            >
              <div className="product hover:shadow-[0_0_5px_rgba(34,197,94,0.2)] hover:shadow-green-400 transition-all duration-300 rounded-lg hover:p-3 xl:hover:p-1">
                <Link to={`/productDetails/${prod.id}/${prod.category.name}`}>
                  <img className="w-fit mb-3" src={prod.imageCover} alt="" />
                  <span className="text-green-600">{prod.category.name}</span>
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
                    className="btn w-5/7 bg-green-600 hover:bg-green-400 transition-colors p-2 rounded-3xl my-2"
                  >
                    Add To Cart
                  </button>
                  <div className="w-1/7">
                    <i
                      onClick={() => {
                        addProductToWishlist(prod.id);
                      }}
                      className="pe- w-full fa-solid fa-heart text-2xl text-green-900 hover:text-green-600 transition-colors"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
