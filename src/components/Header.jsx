import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import cart from "../utils/cart";

function Header() {
  const cartCount = cart();

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-100% h-15 shadow p-5">
      {/* Company Logo */}
      <div className="w-[130px] md:w-[140px] bg-[#FF5F00] md:px-3 md:py-2 px-2 py-1 rounded-lg flex items-center justify-center ">
        <img src="https://storeking.in/site-resources/new-assets/white-storeking-logo.svg" />
      </div>

      {/* Cart Item */}
      <div className="relative w-fit">
        <span>
          <ShoppingCart color="#000000" />
        </span>{" "}
        <span className="absolute text-sm font-bold -top-2 right-1.5 text-red-600">
          {cartCount}
        </span>
      </div>
    </header>
  );
}

export default Header;
