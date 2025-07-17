import React, { useContext } from "react";
import style from "./Register.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Register() {
  let { userLogin, setUserLogin } = useContext(UserContext);

  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  function submitForm(val) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", val)
      .then((response) => {
        setIsLoading(false);
        console.log(response.data.token);
        if (response.data.message === "success") {
          // !
          // setUserLogin(response?.data?.token);
          navigate("/login");
          localStorage.setItem("userToken", response?.data?.token);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error?.response?.data?.message);
        setErrMsg(error?.response?.data?.message);
      });
  }

  let validation = Yup.object().shape({
    name: Yup.string()
      .required("name is required")
      .min(3, "min 3 letters")
      .max(8, "max 8 letters"),
    email: Yup.string().required("email is required").email("invalid mail"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character."
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "invalid rePassword"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "invalid phone number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validation,
    onSubmit: submitForm,
  });

  useEffect(() => {}, []);
  return (
    <>
      <div className=" flex min-h-screen items-start justify-center p-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <div className=" rounded-md p-6">
            <h2 className="my-3 md:text-3xl text-2xl font-bold tracking-tight text-green-800">
              Register Now
            </h2>
            <form onSubmit={formik.handleSubmit} className="space-y-6 mt-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="name"
                    type="text"
                    id="name"
                    className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
                {/* alert from tailwindflex.com  */}
                {formik.errors.name && formik.touched.name ? (
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
                    <span className="text-red-700">{formik.errors.name}</span>
                  </div>
                ) : null}
              </div>

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
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
                {/* alert from tailwindflex.com */}
                {formik.errors.password && formik.touched.password ? (
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
                      {formik.errors.password}
                    </span>
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="rePassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Re-password
                </label>
                <div className="mt-1">
                  <input
                    value={formik.values.rePassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="rePassword"
                    type="password"
                    id="rePassword"
                    autoComplete="confirm-password"
                    className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-green-700 sm:text-sm"
                  />
                </div>
                {/* alert from tailwindflex.com */}
                {formik.errors.rePassword && formik.touched.rePassword ? (
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
                      {formik.errors.rePassword}
                    </span>
                  </div>
                ) : null}
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="phone"
                    type="tel"
                    id="phone"
                    autoComplete="phone-number"
                    className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
                {/* alert from tailwindflex.com */}
                {formik.errors.phone && formik.touched.phone ? (
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
                    <span className="text-red-700">{formik.errors.phone}</span>
                  </div>
                ) : null}
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-8 flex w-full justify-center rounded-md border border-transparent bg-green-700 hover:bg-green-600 transition-colors py-2.5 px-4 text-[15px] font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                >
                  {isLoading ? (
                    <i class="fa-duotone fa-solid fa-spinner fa-spin py-0.5"></i>
                  ) : (
                    "Register Account"
                  )}
                </button>

                {/* error alert from tailwindflex.com */}
                {errMsg ? (
                  <div className="pt-2 text-lg flex items-center justify-center mx-auto max-w-lg">
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
