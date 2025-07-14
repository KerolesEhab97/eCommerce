import React, { useContext } from "react";
import style from "./CheckOut.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const [isOnline, setIsOnline] = useState(true);
  let { cartId, resetCart, cartProducts } = useContext(CartContext);
  let headers = { token: localStorage.getItem("userToken") };
  let navigate = useNavigate();

  function payOnline(val) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {
          shippingAddress: val,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          console.log(response.data);
          window.location.href = response.data.session.url;
        } else {
          toast.error("Error...", {
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // *****************************************************
  function payCash(val) {
    console.log(val);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: val,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response);
        // console.log(response?.data?.data?.user);
        // localStorage.setItem("userId", response?.data?.data?.user);
        if (response.data.status === "success") {
          resetCart();
          toast.success("Check out done", {
            duration: 3000,
          });
          navigate("/");
        } else {
          toast.error("Error...", {
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // *****************************************************
  function detectPayment(val) {
    if (isOnline) {
      payOnline(val);
    } else {
      payCash(val);
    }
  }
  // *****************************************************

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: detectPayment,
  });

  useEffect(() => {}, []);
  return (
    <>
      <div className=" flex min-h-screen items-start justify-center p-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <div className=" rounded-md p-6">
            <h2 className="my-3 text-3xl font-bold tracking-tight text-green-800">
              Check Out Now
            </h2>
            <form onSubmit={formik.handleSubmit} className="space-y-3 mt-6">
              <div>
                <label
                  htmlFor="details"
                  className="block text-sm font-medium text-gray-700"
                >
                  Details
                </label>
                <div className="mt-1">
                  <input
                    value={formik.values.details}
                    onChange={formik.handleChange}
                    name="details"
                    type="text"
                    id="details"
                    autoComplete="email-address"
                    className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <div className="mt-1">
                  <input
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    name="phone"
                    type="tel"
                    id="phone"
                    autoComplete="password"
                    className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <div className="mt-1">
                  <input
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    name="city"
                    type="text"
                    id="city"
                    autoComplete="password"
                    className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="lg:mb-0 flex flex-wrap justify-between items-center mt-10">
                <button
                  onClick={() => {
                    setIsOnline(false);
                  }}
                  type="submit"
                  className="w-full rounded-md bg-green-100 hover:bg-white py-2.5 px-4 text-sm md:text-lg md:py-2 font-medium text-green-700 shadow-sm hover:bg-opacity-75 focus:outline-none hover:border hover:border-green-700 mb-5"
                >
                  <i className="fa-solid fa-credit-card me-2"></i>
                  Pay Cash
                  <i className="fa-solid fa-dollar-sign ms-2"></i>
                </button>
                <button
                  onClick={() => {
                    setIsOnline(true);
                  }}
                  type="submit"
                  className="w-full rounded-md bg-green-100 hover:bg-white py-2.5 px-4 text-sm md:text-lg md:py-2 font-medium text-green-700 shadow-sm hover:bg-opacity-75 focus:outline-none hover:border hover:border-green-700"
                >
                  <i className="fa-solid fa-mobile-screen me-2"></i>
                  Pay Online
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
