import React from "react";
import style from "./Categories.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import useApi from "../../Hooks/useApi";

export default function Categories() {
  // ! Using Custom Hook
  let { data, isError, error, isLoading } = useApi("categories");
  // console.log(data?.data?.data);

  // ! Using react-query
  // function getCategories() {
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  // }
  // let { data, isLoading, isError } = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: getCategories,
  //   select: (data) => {
  //     return data?.data?.data;
  //   },
  // });
  // console.log(data?.data?.data);
 
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h2>Error...</h2>;
  }

  return (
    <div className="flex flex-wrap">
      {data?.data?.data.map((Category) => {
        return (
          <div key={Category?._id} className="flex flex-col w-1/2 md:w-1/5">
            <img
              src={Category?.image}
              alt={Category?.name}
              className="h-[250px] object-cover p-2 mt-7"
            />
            <h2 className="ms-4">{Category?.name}</h2>
          </div>
        );
      })}
    </div>
  );
}
