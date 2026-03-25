import { useEffect, useState } from "react";

function cart() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    const updateCartCount = () => {
      let countItem = JSON.parse(localStorage.getItem("cart")) || [];
      console.log(countItem);
      setCartCount(countItem.length);
      setCartItem(countItem);
    };
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return { cartCount, cartItem };
}

export default cart;
