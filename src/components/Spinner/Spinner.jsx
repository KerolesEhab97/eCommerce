import React from "react";
import style from './Spinner.module.css'
import { useEffect } from "react";
import { useState } from "react";
import { BallTriangle } from "react-loader-spinner";

export default function Spinner() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {

  }, []);
  return <>
    <div className="h-screen flex justify-center items-center">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  </>
}
