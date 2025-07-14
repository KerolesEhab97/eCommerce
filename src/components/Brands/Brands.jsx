import React, { useMemo } from "react";
import style from "./Brands.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import useApi from "../../Hooks/useApi";

export default function Brands() {
  // ! Using Custom Hook
  let { data, isError, error, isLoading } = useApi("brands");
  // console.log(data?.data?.data);

  // ! Using react-query
  // function getBrands() {
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  // }

  // let { data, isError, error, isLoading } = useQuery({
  //   queryKey: ["brands"],
  //   queryFn: getBrands,
  //   select: (data) => {
  //     return data?.data?.data;
  //   },
    // ! week 6 => Session 2 => vedio 5
    // staleTime:6000
    // gcTime:3000
    // refetchOnMount:false
    // refetchOnReconnect:false
    // refetchInterval:2000
    // refetchOnWindowFocus:false
    // refetchInterval:2000 ,
    // refetchIntervalInBackground:false
    // retry: 3,
    // retryDelay: 2000,
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
      {data?.data?.data?.map((brand) => {
        return (
          <img
            src={brand?.image}
            alt={brand?.name}
            key={brand._id}
            className="w-1/3 md:w-1/5"
          />
        );
      })}
    </div>
  );
}
