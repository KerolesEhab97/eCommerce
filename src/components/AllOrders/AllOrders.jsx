import React, { useContext } from "react";
import style from "./AllOrders.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { CartContext } from "../Context/CartContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllOrders() {
  const [myOrders, setMyOrders] = useState(null);

  let userId = localStorage.getItem("userId");
  // !  لازم اعمل context ل userId  عشان ابقي امسحه لما اعمل  logOut
  // ************************************************
  function getUserOrders() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((data) => {
        console.log(data?.data);
        setMyOrders(data?.data);
        {
          data?.data?.map((prod) => {
            console.log(prod?.cartItems);
            prod?.cartItems.map((prod) => {
              console.log(prod.product);
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // ************************************************
  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <>
      <h2 className="border border-green-600 rounded-xl py-2.5 bg-green-50 text-center mt-20 text-lg md:text-3xl text-green-700">
        "Thank you! Your order is confirmed"
      </h2>

      {myOrders?.length > 0 ? (
        <div className="my-3 flex justify-between items-center">
          <div className="w-2/3 ">
            <h2 className="md:text-xl text-green-700">
              Number Of All orders : {myOrders?.length}
            </h2>
          </div>
        </div>
      ) : null}
    </>
  );
}
