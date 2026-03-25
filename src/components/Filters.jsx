import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

function Filters({ setPage }) {
  const [params, setParams] = useSearchParams();

  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const brand = params.get("brand") || "";

  const [searchInput, setSearchInput] = useState(search);
  const { debouncedValue } = useDebounce(searchInput, 500);

  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(params);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setParams(newParams);
    setPage(1);
  };

  //  Debounce
  useEffect(() => {
    if (search !== debouncedValue) {
      updateParams("search", debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (search !== searchInput) {
      setSearchInput(search);
    }
  }, [search]);

  return (
    <div className="w-full p-4 flex justify-between flex-wrap gap-4">
      <input
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="border px-3 py-2 rounded"
      />

      <div className="flex gap-2">
        <select
          value={category}
          onChange={(e) => updateParams("category", e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Shoes">Shoes</option>
          <option value="T-Shirts">T-Shirts</option>
          <option value="Watches">Watches</option>
          <option value="Sunglasses">Sunglasses</option>
          <option value="Bags">Bags</option>
          <option value="Electronics">Electronics</option>
          <option value="Sports">Sports</option>
        </select>

        <select
          value={brand}
          onChange={(e) => updateParams("brand", e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Brands</option>
          <option value="Nike">Nike</option>
          <option value="Zara">Zara</option>
          <option value="Fossil">Fossil</option>
          <option value="Adidas">Adidas</option>
          <option value="Sony">Sony</option>
          <option value="Apple">Apple</option>
          <option value="Powermax">Powermax</option>
          <option value="Casio">Casio</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
