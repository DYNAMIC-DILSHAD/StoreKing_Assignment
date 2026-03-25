import React from "react";
import cart from "../utils/cart";

function Cart() {
  const { cartItem } = cart();
  console.log("cartItem", cartItem);

  const totalPrice = cartItem.reduce((accum, curr) => {
    return accum + curr.price * curr.quantity;
  }, 0);

  console.log(totalPrice);

  return (
    <div className="w-full flex flex-col flex-wrap justify-center items-center">
      <h2 className=" text-lg font-semibold my-10"> Your Cart Items</h2>
      {cartItem.length !== 0 ? (
        <div className="max-w-6xl w-full grid grid-cols-12 gap-6 p-4">
          {/* Left Side */}
          <div className=" col-span-12 md:col-span-8 lg:col-span-8 h-fit gap-4">
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 bg-gray-100 p-4 rounded "
              >
                <div>
                  <img src={item.image} className="h-28 w-28 rounded" />
                </div>
                <div className="flex-flex-col">
                  <span className="block text-2xl font-semibold">
                    {item.name}
                  </span>
                  <span className="block text-gray-500 font-semibold">
                    {item.category}
                  </span>
                  <span className="block text-red-600 font-semibold">
                    {" "}
                    ₹ {item.price * item.quantity}{" "}
                  </span>
                  <span className="block text-gray-500 font-semibold">
                    Quantity: {item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="col-span-12  md:col-span-4 lg:col-span-4">
            <span className="block p-4 bg-blue-500 text-white text-center">
              Summary
            </span>

            <div className="flex justify-between p-2">
              <span className="block text-gray-700">TotalQty</span>
              <span className="block font-semibold">{cartItem.length}</span>
            </div>
            <div className="flex justify-between p-2 ">
              <span className="block text-gray-700">TotalPrice</span>
              <span className="block font-semibold">₹{totalPrice}</span>
            </div>

            <button className=" w-full bg-red-500 text-white p-4">
              Payment
            </button>
          </div>
        </div>
      ) : (
        <h3 className="text-3xl ">Your bag is empty</h3>
      )}
    </div>
  );
}

export default Cart;
