import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "./utilsComponents/Spinner";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const ProductCard = ({ product, isAdmin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    setData(userData);
  }, []);

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

  const addToCart = async () => {
    try {
      setIsAuthenticated(true);
      if (!data || data.length <= 0) {
        return setIsAuthenticated(isAuthenticated ? false : true);
      }
    } catch (err) {}
  };

  return (
    <div
      className="max-w-xs  rounded overflow-hidden shadow-xl border border-1 border-[#0b1423]"
      onClick={() => setIsAuthenticated(false)}
    >
      <Link to={`/product/${product?._id}`}>
        <img
          src={product.img}
          alt={product.name}
          className="w-64 h-64 object-contain hover:scale-105 duration-300 -z-10  transition-transform"
          loading="lazy"
        />
      </Link>
      <div className="px-6 py-4 bg-[#0b1423] z-2 relative">
        <div className="font-bold text-xl mb-2 text-[#f5f5f5]">
          {product.name}
        </div>
        <div className="flex gap-8 items-center">
          {product?.priceDiscount > 0 ? (
            <del className=" text-[#f5f5f5]  block">{product?.price} L.E</del>
          ) : (
            <p className=" text-[#f5f5f5]  block">{product?.price} L.E</p>
          )}

          {product?.priceDiscount > 0 && (
            <p className=" text-base text-[#f5f5f5]">
              {product.priceDiscount} L.E
            </p>
          )}
        </div>
        <Link
          to={`/product/${product?._id}`}
          className="bg-[#ec981a] hover:bg-[#d49433] transition-colors duration-300 py-2 px-4 rounded-md text-[#0b1423] mt-4 block text-center font-semibold text-xl"
        >
          More Details
        </Link>
        {!isAdmin && (
          <button
            onClick={addToCart}
            className="flex bg-[#ec981a] w-full hover:bg-[#d49433] transition-colors duration-300 py-2 px-4 rounded-md text-[#0b1423] mt-4 items-center justify-center gap-4 text-center font-semibold text-xl"
          >
            <span>Add To Cart</span>
            <MdOutlineAddShoppingCart />
          </button>
        )}
      </div>
      {isAdmin && (
        <div className="mt-8 flex items-center justify-between">
          <Link
            to={`/product/${product?._id}?lpl,]ohg]ulv=true`}
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
      {!isAuthenticated && (
        <div className="modal fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[20rem] h-[12.5rem] justify-center items-center flex bg-red-600 shadow-2xl rounded-lg">
          <p className="w-fit text-2xl text-white">you must login first</p>
        </div>
      )}

      {error && (
        <p className="text-red-600 text-xl text-center">Some error occured</p>
      )}
    </div>
  );
};

export default ProductCard;
