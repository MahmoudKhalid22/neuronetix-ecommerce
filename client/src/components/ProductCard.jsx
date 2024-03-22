import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BadRequestPage from "../pages/BadRequestPage";
import Spinner from "./utilsComponents/Spinner";

const ProductCard = ({ product, isAdmin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    setData(userData);
  }, []);
  if (!data || data.length === 0) {
    return <BadRequestPage />;
  }

  const adminToken = data?.user?.role === "admin" ? data?.accessToken : null;

  const deleteProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://typastore.up.railway.app/product/" + product?._id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + adminToken,
          },
        }
      );
      const result = await res.json();
      console.log(result);
      if (!res.ok) {
        throw new Error(result);
      }
      window.location.reload();
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xs  rounded overflow-hidden shadow-xl">
      <img
        src={product.img}
        alt={product.name}
        className="w-64 h-64 object-contain"
        loading="lazy"
      />
      <div className="px-6 py-4 bg-[#0b1423]">
        <div className="font-bold text-xl mb-2 text-[#f5f5f5]">
          {product.name}
        </div>
        <div className="flex gap-8 items-center">
          <del className=" text-base text-[#f5f5f5]">{product.price} L.E</del>
          <p className=" text-base text-[#f5f5f5]">
            {product.priceDiscount} L.E
          </p>
        </div>
      </div>
      {isAdmin && (
        <div className="mt-8 flex items-center justify-between">
          <Link
            to={`product/${product?._id}`}
            className="bg-[#0b1423] mx-auto w-fit hover:bg-[#3c434f] transition-colors duration-300 text-white font-bold py-2 px-4 block mb-6"
          >
            Update
          </Link>
          <button
            className="bg-red-700 mx-auto w-fit hover:bg-red-800 transition-colors duration-300 text-white font-bold py-2 px-4 block mb-6"
            onClick={deleteProduct}
            disabled={loading}
          >
            Delete
          </button>
        </div>
      )}
      {loading && <Spinner />}
      {error && (
        <p className="text-red-600 text-xl text-center">Some error occured</p>
      )}
    </div>
  );
};

export default ProductCard;
