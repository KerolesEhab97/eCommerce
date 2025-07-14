import React from "react";
import style from './ProtectRoute.module.css'
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectRoute(props) {

  if (localStorage.getItem('userToken') !== null) {
    return props.children
  }
  else {
    return <Navigate to={'/login'} />
  }

}
