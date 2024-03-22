import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, isAdmin }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-32 object-cover"
        loading="lazy"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">{product.price} L.E</p>
      </div>
      {isAdmin && (
        <Link
          to={`product/${product?._id}`}
          className="bg-[#0b1423] mx-auto w-fit hover:bg-blue-700 text-white font-bold py-2 px-4 block mb-6"
        >
          Update
        </Link>
      )}
    </div>
  );
};

export default ProductCard;
