import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";
import Products from "./components/Products/Products";
import CounterContextProvider from "./components/Context/CounterContext";
import UserContextProvider from "./components/Context/UserContext";
import WishList from "./components/WishList/WishList";
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./components/Context/CartContext";
import { Toaster } from "react-hot-toast";
import WishlistContextProvider from "./components/Context/WishlistContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CheckOut from "./components/CheckOut/CheckOut";
import AllOrders from "./components/AllOrders/AllOrders";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ForgetPassword from "./components/Authentication/ForgetPassword/ForgetPassword";
import VerifyResetCode from "./components/Authentication/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./components/Authentication/ResetPassword/ResetPassword";

let queryClient = new QueryClient();
function App() {
  const [count, setCount] = useState(0);

  let route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          ),
        },
        {
          path: "eCommerce",
          element: (
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectRoute>
              <Products />
            </ProtectRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectRoute>
              <Brands />
            </ProtectRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectRoute>
              <Categories />
            </ProtectRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectRoute>
              <Cart />
            </ProtectRoute>
          ),
        },
        {
          path: "productDetails/:id/:category",
          element: (
            <ProtectRoute>
              <ProductDetails />
            </ProtectRoute>
          ),
        },
        {
          path: "wishList",
          element: (
            <ProtectRoute>
              <WishList />
            </ProtectRoute>
          ),
        },
        {
          path: "CheckOut",
          element: (
            <ProtectRoute>
              <CheckOut />
            </ProtectRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectRoute>
              <AllOrders />
            </ProtectRoute>
          ),
        },
        { path: "/forgetPassword", element: <ForgetPassword /> },
        { path: "/verifyResetCode", element: <VerifyResetCode /> },
        { path: "/resetPassword", element: <ResetPassword /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <CounterContextProvider>
                <RouterProvider router={route}></RouterProvider>
                <Toaster position="top-right" />
                <ReactQueryDevtools />
              </CounterContextProvider>
            </WishlistContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
