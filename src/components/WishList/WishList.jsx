import React, { useContext } from "react";
import style from "./WishList.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function WishList() {
  const { numOfWishlistItems, wishlistProducts, deleteWishlistItem } =
    useContext(WishlistContext);

  const [counter, setCounter] = useState(0);
  // *********************************************************
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
  // **************************************************
  async function handleDelete(prodId) {
    let response = await deleteWishlistItem(prodId);
    // console.log(response);
    if (response.data.status === "success") {
      // alert
      toast.success("Product Deleted", {
        duration: 3000,
      });
    } else {
      // error
      toast.error("Error....", {
        duration: 3000,
      });
    }
  }
  // *********************************************************
  useEffect(() => {}, []);
  return (
    <>
      {wishlistProducts?.length > 0 ? (
        <div className="my-3">
          <h2 className="text-xl text-green-700">
            Number Of Your Wishlist Items : {numOfWishlistItems}
          </h2>
          {/* ********************************************************************************* */}
          <div className="flex flex-wrap justify-center items-center">
            {wishlistProducts?.map((prod) => {
              return (
                <div
                  key={prod?.id}
                  id={prod?.id}
                  className="border rounded-xl w-full m-1.5 bg-white border-gray-200 transition-all duration-300 hover:bg-gray-100"
                >
                  <div className="">
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/productDetails/${prod?.id}/${prod?.category?.name}`}
                        className="w-2/3"
                      >
                        <div className="flex items-center">
                          <div className="w-1/2 flex justify-center">
                            <img
                              src={prod?.imageCover}
                              className="w-30 md:w-40 object-contain max-w-full h-[180px]"
                              alt={prod?.title}
                            />
                          </div>
                          <div className="w-1/2 flex flex-col items-center justify-center text-center">
                            <h3 className="px-6 py-4 font-semibold text-gray-900">
                              {prod?.title?.split(" ").slice(0, 2).join(" ")}
                            </h3>

                            <h2 className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                              {prod?.price} EGP
                            </h2>
                          </div>
                        </div>
                      </Link>

                      <div className="px-6 py-4">
                        <div className="flex flex-col">
                          <button
                            onClick={() => {
                              addProductToCart(prod?.id);
                            }}
                            className="text-sm cursor-pointer bg-green-50 hover:bg-white transition-colors px-5 py-2.5 rounded-3xl my-2  text-green-600 border text-center flex justify-center items-center"
                          >
                            Add To Cart
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(prod?.id);
                            }}
                            className="cursor-pointer bg-red-50 hover:bg-white transition-colors px-5 py-2 rounded-3xl my-2  text-red-600 border text-center flex justify-center items-center"
                          >
                            <span>
                              <i className="fa-solid fa-trash me-1.5"></i>
                            </span>
                            Remove
                          </button>
                          {/* <button className="cursor-pointer bg-blue-50 hover:bg-white transition-colors px-5 py-2 rounded-3xl my-2  text-blue-600 border text-center flex justify-center items-center">
                            Buy Now
                          </button> */}
                        </div>
                      </div>
                    </div>
                    <p className="my-2 md:mx-8 mx-3"> {prod?.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ********************************************************************************* */}
        </div>
      ) : (
        <h2 className="text-center">Your Wishlist Is Empty</h2>
      )}
    </>
  );
}
