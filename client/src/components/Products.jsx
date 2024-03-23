import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";

function Products() {
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("admin");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(
          "https://typastore.up.railway.app/product"
        );
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
        <div className="flex flex-wrap gap-4 lg:gap-8 justify-center">
          {products.length > 0 ? (
            products?.map((product) => (
              <ProductCard
                product={product}
                key={product._id}
                isAdmin={isAdmin}
              />
            ))
          ) : (
            <h3 className="text-2xl font-semibold text-red-600 text-right">
              There is no products now!
            </h3>
          )}
        </div>
      )}
      {/* {!error && !loading && products.length > 6 && (
        <button className="bg-[#43766C] hover:bg-[#2f534c] transition-colors text-md sm:text-xl block mx-auto px-4 py-2 font-semibold text-white my-8">
          <Link to="/teacher">More...</Link>
        </button>
      )} */}
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
