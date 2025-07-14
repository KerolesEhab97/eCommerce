import React, { useContext } from "react";
import style from "./Home.module.css";
import { useEffect } from "react";
import { useState } from "react";
import Products from "../Products/Products";
import Brands from "../Brands/Brands";
import { CounterContext } from "../Context/CounterContext";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";

export default function Home() {
  let { counter, setCounter, user } = useContext(CounterContext);

  function incCounter() {
    setCounter(counter + 1);
  }
  // const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </>
  );
}
