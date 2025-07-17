import React from "react";
import style from "./VerifyResetCode.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifyResetCode() {
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let Navigate = useNavigate();

  function submitCode(val) {
    setIsLoading(true);
    toast.loading("Loading....", { duration: 2000, position: "top-center" });
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, val)
      .then((response) => {
        // console.log(response);
        setIsLoading(false);
        if (response?.data?.status === "Success") {
          toast.success("Success", { position: "top-center" });
          //! *******
          Navigate("/resetPassword");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log(error?.response?.data?.message);
        setErrMsg(error?.response?.data?.message);
      });
  }

  let validation = Yup.object().shape({
    resetCode: Yup.string().required("code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validation,
    onSubmit: submitCode,
  });

  useEffect(() => {}, []);
  return (
    <>
      <div className=" flex min-h-screen items-start justify-center p-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <div className=" rounded-md p-6">
            <h2 className="my-3 md:text-3xl text-2xl md:font-bold font-medium tracking-tight text-green-800">
              Verify Code
            </h2>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="resetCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Verification Code
                </label>
                <div className="mt-1">
                  <input
                    value={formik.values.resetCode}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="resetCode"
                    type="text"
                    id="resetCode"
                    autoComplete="email-address"
                    className="px-2 py-2 mt-1 block w-full md:w-1/2 rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
                {/* alert from tailwindflex.com */}
                {formik.errors.resetCode && formik.touched.resetCode ? (
                  <div className="pt-1 text-lg flex items-center max-w-lg">
                    <svg
                      viewBox="0 0 24 24"
                      className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                    >
                      <path
                        fill="currentColor"
                        d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                      />
                    </svg>
                    <span className="text-red-700">
                      {formik.errors.resetCode}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="lg:mb-0 flex justify-between items-center">
                <button
                  type="submit"
                  className="flex justify-center rounded-md border border-green-700 bg-green-100 hover:bg-white font-medium text-green-700 transition-colors py-2.5 md:px-15 px-6 text-[15px] shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                >
                  {isLoading ? (
                    <i className="fa-duotone fa-solid fa-spinner fa-spin py-0.5"></i>
                  ) : (
                    "Verify"
                  )}
                </button>
                {/* error alert from tailwindflex.com */}
                {errMsg ? (
                  <div className="text-lg flex items-center justify-center mx-auto ">
                    <svg
                      viewBox="0 0 24 24"
                      className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                    >
                      <path
                        fill="currentColor"
                        d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                      />
                    </svg>
                    <span className="text-red-700">{errMsg}</span>
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
