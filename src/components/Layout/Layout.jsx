import React from "react";
import style from "./Layout.module.css";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [counter, setCounter] = useState(0);
  useEffect(() => { }, []);
  return (
    <>
      <Navbar />
      <div className="lg:pt-20 container mx-auto max-w-12/14">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
