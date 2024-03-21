import React, { useEffect, useState } from "react";
import Card from "./Teacher/Card";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/product");
        setLoading(true);
        setError(false);
        const prds = await response.json();
        if (!response.ok) {
          throw new Error(prds);
        }
        setProducts(prds);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  return (
    <div id="products" className="py-8 px-6">
      <h3 className=" py-4 my-12 text-xl sm:text-3xl font-bold text-[#6d727b]">
        Products
      </h3>
      {!error && !loading && (
        <div className="flex flex-wrap gap-4 lg:gap-8 justify-start">
          {products.length > 0 ? (
            products?.map((product) => (
              <Card
                key={product._id}
                id={product._id}
                name={product.name}
                role={product.role}
                professional={product.professional}
                price={product?.price}
                avatar={product?.avatar}
                multiple={true}
              />
            ))
          ) : (
            <h3 className="text-2xl font-semibold text-red-600 text-right">
              There is no products now!
            </h3>
          )}
        </div>
      )}
      {!error && !loading && products.length > 6 && (
        <button className="bg-[#43766C] hover:bg-[#2f534c] transition-colors text-md sm:text-xl block mx-auto px-4 py-2 font-semibold text-white my-8">
          <Link to="/teacher">More...</Link>
        </button>
      )}
      {!error && loading && (
        <p className="text-center font-semibold text-3xl text-[#43766C]">
          loading...
        </p>
      )}
      {error && !loading && (
        <p className="text-center font-semibold text-3xl text-rose-700">
          Internal server error
        </p>
      )}
    </div>
  );
}

export default Products;