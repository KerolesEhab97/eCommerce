import React, { useContext } from "react";
import style from "./Cart.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { CartContext } from "../Context/CartContext";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const {
    numOfCartItems,
    totalCartPrice,
    cartProducts,
    updateCart,
    deleteCartItem,
    clearAllCartItems,
  } = useContext(CartContext);
  const [counter, setCounter] = useState(0);

  async function handleUpdata(prodId, count) {
    let response = await updateCart(prodId, count);
    // console.log(response);
    if (response.data.status === "success") {
      // alert
      toast.success("Product Updated", {
        duration: 3000,
      });
    } else {
      // error
      toast.error("Error....", {
        duration: 3000,
      });
    }
  }
  // **************************************************
  async function handleDelete(prodId) {
    let response = await deleteCartItem(prodId);
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
  // **************************************************
  async function handleClear() {
    let response = await clearAllCartItems();
    // console.log(response);
    if (response.data.message === "success") {
      // alert
      toast.success("All Items Deleted", {
        duration: 3000,
      });
    } else {
      // error
      toast.error("Error....", {
        duration: 3000,
      });
    }
  }
  // **************************************************
  useEffect(() => {}, []);
  return (
    <>
      {cartProducts?.length > 0 ? (
        <div className="mb-5">
          <div className="my-3 flex justify-between items-center">
            <div className="w-2/3 ">
              <h2 className="md:text-xl text-green-700">
                Number Of Cart Items : {numOfCartItems}
              </h2>
              <h3 className="md:text-xl ">Total Price : {totalCartPrice}</h3>
            </div>
            <div className="ms-auto">
              <Link to={"/CheckOut"}>
                <button className="cursor-pointer bg-blue-700 hover:bg-blue-600 transition-colors py-2.5 md:px-8 px-4 rounded-2xl md:font-medium text-white text-sm md:text-lg">
                  Check Out
                </button>
              </Link>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-lg text-gray-900 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-5">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Product
                  </th>
                  <th scope="col" className=" py-5 text-center">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {cartProducts?.map((prod) => {
                  return (
                    <tr
                      key={prod?.product?.id}
                      id={prod?.product?.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="">
                        <Link
                          to={`/productDetails/${prod?.product?.id}/${prod?.product?.category?.name}`}
                        >
                          <img
                            src={prod?.product?.imageCover}
                            className="w-20 md:w-40 object-cover max-w-full max-h-full"
                            alt={prod?.product?.brand?.name}
                          />
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {prod?.product?.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              handleUpdata(prod?.product?.id, prod?.count - 1);
                            }}
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-7 text-gray-500 bg-white border border-green-500 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <input
                              // type="number"
                              id="first_product"
                              className="text-center bg-gray-50 w-10 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder={prod?.count}
                              required
                            />
                          </div>
                          <button
                            onClick={() => {
                              handleUpdata(prod?.product?.id, prod?.count + 1);
                            }}
                            className="inline-flex items-center justify-center h-6 w-7 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-green-500 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {prod?.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <button
                            onClick={() => {
                              handleDelete(prod?.product?.id);
                            }}
                            className="cursor-pointer bg-red-50 hover:bg-white transition-colors px-5 py-2 rounded-3xl my-2 font-medium text-red-600 border text-center flex justify-center items-center"
                          >
                            <span>
                              <i className="fa-solid fa-trash me-1.5"></i>
                            </span>
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {cartProducts?.length > 0 ? (
              <div className="w-full flex justify-center items-center my-3">
                <span className="text-red-800 me-3">Click here to</span>
                <button
                  onClick={handleClear}
                  className="cursor-pointer bg-red-700 hover:bg-red-600 transition-colors py-2.5 px-6 rounded-3xl font-medium text-white"
                >
                  <i className="fa-solid fa-trash me-1.5"></i>
                  Clear All Products
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <h2 className="text-center">Your Cart Is Empty</h2>
      )}
    </>
  );
}
