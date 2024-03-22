import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, isAdmin }) => {
  console.log(product);
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
