import axios from "axios";

import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext(0);
export default function WishlistContextProvider(props) {
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState(null);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  let token = localStorage.getItem("userToken");
  // *************************************************
  function addToWishlist(prodId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
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
        getUserWishlistItem();

        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  // *************************************************
  function getUserWishlistItem() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: headers,
      })
      .then((response) => {
        setWishlistProducts(response?.data?.data);
        setNumOfWishlistItems(response?.data?.count);

        // console.log(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //  **********************************************
  function deleteWishlistItem(prodId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`, {
        headers: headers,
      })
      .then((response) => {
        getUserWishlistItem();
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  // *************************************************
  useEffect(() => {
    if (token) {
      getUserWishlistItem();
    }
  }, [token]);
  // *************************************************
  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        deleteWishlistItem,
        numOfWishlistItems,
        wishlistProducts,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
