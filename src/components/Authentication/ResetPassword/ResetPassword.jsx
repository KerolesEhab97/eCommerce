import React, { useContext } from "react";
import style from "./ResetPassword.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function ResetPassword() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  const [counter, setCounter] = useState(0);

  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let Navigate = useNavigate();
  function submitNewPassword(val) {
    setIsLoading(true);
    toast.loading("Loading....", { duration: 2000, position: "top-center" });
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, val)
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        if (response) {
          toast.success("Password Changed", { position: "top-center" });
          //! *******
          Navigate("/login");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error?.response?.data?.message);
        setErrMsg(error?.response?.data?.message);
      });
  }

  let validation = Yup.object().shape({
    email: Yup.string().required("email is required").email("invalid mail"),
    newPassword: Yup.string()
      .required("new password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character."
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validation,
    onSubmit: submitNewPassword,
  });

  useEffect(() => {}, []);
  return (
    <>
      <div className=" flex min-h-screen items-start justify-center p-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <div className=" rounded-md p-6">
            <h2 className="my-3 md:text-3xl text-2xl md:font-bold font-medium tracking-tight text-green-800">
              Reset Password
            </h2>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="email"
                    type="email"
                    id="email"
                    autoComplete="email-address"
                    className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
                {/* alert from tailwindflex.com */}
                {formik.errors.email && formik.touched.email ? (
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
                    <span className="text-red-700">{formik.errors.email}</span>
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  rePassword
                </label>
                <div className="mt-1">
                  <input
                    value={formik.values.newPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="newPassword"
                    type="newPassword"
                    id="newPassword"
                    autoComplete="newPassword"
                    className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
                {/* alert from tailwindflex.com */}
                {formik.errors.newPassword && formik.touched.newPassword ? (
                  <div className="pt-1 text-lg flex items-center  max-w-lg">
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
                      {formik.errors.newPassword}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="lg:mb-0 flex justify-between items-center">
                <button
                  type="submit"
                  className="flex justify-center rounded-md border border-transparent bg-green-700 hover:bg-green-600 transition-colors py-2.5 md:px-10 px-6 text-[15px] font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                >
                  {isLoading ? (
                    <i className="fa-duotone fa-solid fa-spinner fa-spin py-0.5"></i>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
              {/* error alert from tailwindflex.com */}
              {errMsg ? (
                <div className="text-lg flex items-center justify-center mx-auto max-w-lg">
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
