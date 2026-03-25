import React, { useState } from "react";
import { products } from "./ProductsData/products.js";
import Filters from "./Filters.jsx";
import { useSearchParams } from "react-router-dom";

function ProducsList() {
  const [page, setPage] = useState(1);
  const [params] = useSearchParams();
  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const brand = params.get("brand") || "";

  // Filter Products with name or Id
  const filterProducts = products.filter((item) => {
    return (
      (search
        ? item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.id.toLowerCase().includes(search.toLowerCase())
        : true) &&
      (category ? item.category === category : true) &&
      (brand ? item.brand === brand : true)
    );
  });
  // Show only 9 products
  const displayedProducts = filterProducts.slice(0, page * 9);
  

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const iscartExisting = cart.find((item) => {
      return item && item.id === product.id;
    });

    if (iscartExisting) {
      // increase the count of existing product
      cart = cart.map((item) => {
        return item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
    } else {
      // add new product
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-7xl flex justify-center items-center flex-col">
        {/* Filter */}
        <Filters setPage={setPage} />

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ">
          {displayedProducts &&
            displayedProducts.map((item) => (
              <div
                key={item.id}
                className=" p-5 rounded transform transition duration-300 ease-in-out hover:scale-105 shadow hover:shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover rounded"
                />

                {/* ProductID and ProductName */}
                <div className="flex justify-between mt-2 text-gray-700 text-sm">
                  <span>{item.id}</span>
                  <span>{item.name}</span>
                </div>

                <p className="text-sm text-gray-800 my-2">{item.description}</p>

                {/* Price and MRP */}

                <div className=" p-1 text-gray-900">
                  <span className="font-semibold">₹{item.price}</span>
                  <span className="ml-2 decoration-red-500 line-through text-sm">
                    {item.mrp}
                  </span>
                </div>

                {/* ADD to CART Button */}
                <div className="w-full flex justify-center items-center mt-4">
                  <button
                    className="p-3 px-5 bg-purple-600 rounded-md text-white text-sm cursor-pointer hover:bg-purple-700"
                    onClick={() => {
                      addToCart(item);
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
        </div>

        {displayedProducts.length === 0 ? (
          <h3 className="text-center">No Result Found</h3>
        ) : displayedProducts.length === products.length ? (
          <h3 className="p-4">No more items available</h3>
        ) : (
          <div className="w-full my-20 flex justify-center items-center">
            {displayedProducts.length !== 0 && (
              <button
                className="border border-purple-600 text-purple-600 px-4 py-2 rounded hover:bg-purple-100 cursor-pointer"
                onClick={() => {
                  setPage(page + 1);
                }}
                // disabled={true}
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProducsList;
