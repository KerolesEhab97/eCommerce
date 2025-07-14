import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setCartId] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);

  // let headers = { token: localStorage.getItem("userToken") };
  // let token = localStorage.getItem("userToken");
  const getUserToken = () => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem("userToken");
      }
    } catch (error) {
      console.error("localStorage not available:", error);
    }
    return null;
  };

  let token = getUserToken();
  let headers = { token: token };

  //  **********************************************
  function resetCart() {
    setCartId(null);
    setTotalCartPrice(0);
    setCartProducts(null);
    setNumOfCartItems(0);
  }
  //  **********************************************
  function addToCart(prodId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          // ! frist obj --> Body
          productId: prodId,
        },
        {
          // ! second obj --> Header
          headers: headers,
        }
      )
      .then((response) => {
        getUserCartItem();

        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  //  ********************************************************

  function getUserCartItem() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: headers,
      })
      .then((response) => {
        setCartId(response?.data?.cartId);
        setTotalCartPrice(response?.data?.data?.totalCartPrice);
        setCartProducts(response?.data?.data?.products);
        setNumOfCartItems(response?.data?.numOfCartItems);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //  **********************************************

  function updateCart(prodId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
        { count: count },
        { headers: headers }
      )
      .then((response) => {
        setCartId(response?.data?.cartId);
        setTotalCartPrice(response?.data?.data?.totalCartPrice);
        setCartProducts(response?.data?.data?.products);
        setNumOfCartItems(response?.data?.numOfCartItems);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  //  **********************************************
  function deleteCartItem(prodId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`, {
        headers: headers,
      })
      .then((response) => {
        setCartId(response?.data?.cartId);
        setTotalCartPrice(response?.data?.data?.totalCartPrice);
        setCartProducts(response?.data?.data?.products);
        setNumOfCartItems(response?.data?.numOfCartItems);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  //  **********************************************
  function clearAllCartItems() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
        headers: headers,
      })
      .then((response) => {
        setCartId(response?.data?.cartId);
        setTotalCartPrice(response?.data?.data?.totalCartPrice);
        setCartProducts(response?.data?.data?.products);
        setNumOfCartItems(response?.data?.numOfCartItems);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  //  **********************************************
  useEffect(() => {
    if (token) {
      getUserCartItem();
    }
  }, [token]);
  return (
    <CartContext.Provider
      value={{
        addToCart,
        updateCart,
        deleteCartItem,
        clearAllCartItems,
        resetCart,
        cartId,
        totalCartPrice,
        cartProducts,
        numOfCartItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
