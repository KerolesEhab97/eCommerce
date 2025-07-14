import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import { useEffect } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CounterContext } from "../Context/CounterContext";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  const { numOfCartItems } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let navigate = useNavigate();

  let { userLogin, setUserLogin } = useContext(UserContext);

  let { counter } = useContext(CounterContext);
  
  function logout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <nav className="bg-slate-100 p-3 static lg:fixed top-0 start-0 end-0 z-50">
        <div className="container max-w-[1300px] mx-auto flex flex-col items-center justify-between md:flex-row px-4 md:px-7">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="text-2xl md:text-3xl w-36 md:w-[200px] mx-2 md:mx-5">
              <Link to="/">
                <i className="fa-solid fa-cart-shopping nav-icon text-green-600"></i>
                <span className="h3 bold ps-1">fresh cart</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 border border-gray-400 rounded"
              onClick={toggleMenu}
            >
              <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
              <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
              <span className="block w-5 h-0.5 bg-gray-600 "></span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex flex-row items-center">
              {userLogin !== null ? (
                <>
                  <li className="text-l text-gray-500 py-2 mx-2">
                    <NavLink
                      className="relative myActive text-center md:text-left"
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="text-l text-gray-500 py-2 mx-2">
                    <NavLink
                      className="relative myActive text-center md:text-left"
                      to="cart"
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li className="text-l text-gray-500 py-2 mx-2">
                    <NavLink
                      className="relative myActive text-center md:text-left"
                      to="wishList"
                    >
                      Wishlist
                    </NavLink>
                  </li>
                  <li className="text-l text-gray-500 py-2 mx-2">
                    <NavLink
                      className="relative myActive text-center md:text-left"
                      to="products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="text-l text-gray-500 py-2 mx-2">
                    <NavLink
                      className="relative myActive text-center md:text-left"
                      to="categories"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li className="text-l text-gray-500 py-2 mx-2">
                    <NavLink
                      className="relative myActive text-center md:text-left"
                      to="brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:block">
            <ul className="flex flex-row items-center">
              {userLogin === null ? (
                <>
                  <li className="text-l text-gray-500 py-2 mx-2">
                    <NavLink className="relative myActive" to="register">
                      Register
                    </NavLink>
                  </li>
                  <li className="text-l text-gray-500 py-2 mx-2">
                    <NavLink className="relative myActive" to="login">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <div className="flex items-center">
                  <li className="mx-2">
                    <Link to="cart">
                      <div className="relative">
                        <i className="pt-3 fa-solid fa-cart-shopping nav-icon text-slate-600 text-2xl md:text-3xl"></i>
                        {numOfCartItems > 0 ? (
                          <p className="bg-green-600 w-[18px] md:w-[20px] h-[18px] md:h-[20px] text-[12px] md:text-[14px] text-center rounded-md text-white font-semibold absolute -top-0.5 -end-0.5">
                            {numOfCartItems}
                          </p>
                        ) : null}
                      </div>
                    </Link>
                  </li>

                  <li
                    onClick={logout}
                    className="text-l text-gray-500 py-2 mx-2"
                  >
                    <span
                      className="relative myActive cursor-pointer"
                      to="logout"
                    >
                      Logout
                    </span>
                  </li>
                </div>
              )}

              {/* <li className="py-2 mx-3 flex">
                <i className="text-green-700 text-[18px] mx-1 fa-brands fa-facebook" />
                <i className="text-green-700 text-[18px] mx-1 fa-brands fa-tiktok" />
                <i className="text-green-700 text-[18px] mx-1 fa-brands fa-youtube" />
                <i className="text-green-700 text-[18px] mx-1 fa-brands fa-linkedin" />
              </li> */}
            </ul>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden bg-white border-t border-gray-200 mt-3 py-2 overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <ul className="flex flex-col">
            {userLogin !== null ? (
              <>
                <li className="text-gray-500 py-2 px-4 ">
                  <NavLink
                    className="block myActive"
                    to="/"
                    onClick={closeMenu}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="text-gray-500 py-2 px-4 ">
                  <NavLink
                    className="block myActive"
                    to="cart"
                    onClick={closeMenu}
                  >
                    cart
                  </NavLink>
                </li>
                <li className="text-gray-500 py-2 px-4 ">
                  <NavLink
                    className="block myActive"
                    to="wishList"
                    onClick={closeMenu}
                  >
                    wish list
                  </NavLink>
                </li>
                <li className="text-gray-500 py-2 px-4 ">
                  <NavLink
                    className="block myActive"
                    to="products"
                    onClick={closeMenu}
                  >
                    Products
                  </NavLink>
                </li>
                <li className="text-gray-500 py-2 px-4 ">
                  <NavLink
                    className="block myActive"
                    to="categories"
                    onClick={closeMenu}
                  >
                    categories
                  </NavLink>
                </li>
                <li className="text-gray-500 py-2 px-4 ">
                  <NavLink
                    className="block myActive"
                    to="brands"
                    onClick={closeMenu}
                  >
                    brands
                  </NavLink>
                </li>
                
                {/* Mobile Cart with Badge */}
                <li className="py-3 px-4  flex justify-center">
                  <Link to="cart" onClick={closeMenu}>
                    <div className="relative">
                      <i className="fa-solid fa-cart-shopping text-gray-700 text-3xl"></i>
                      {numOfCartItems > 0 ? (
                        <p className="bg-green-600 w-[18px] h-[18px] text-[12px] text-center rounded-md text-white font-semibold absolute -top-1 -end-1">
                          {numOfCartItems}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </li>

                <li className="text-gray-500 py-2 px-4">
                  <span
                    className="block cursor-pointer text-center"
                    onClick={logout}
                  >
                    log out
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="text-gray-500 py-2 px-4 ">
                  <NavLink className="block myActive" to="register" onClick={closeMenu}>
                    Register
                  </NavLink>
                </li>
                <li className="text-gray-500 py-2 px-4">
                  <NavLink className="block myActive" to="login" onClick={closeMenu}>
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}