import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Spinner from "../components/utilsComponents/Spinner";
const Product = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  let isAdmin = searchParams.get("lpl,]ohg]ulv");
  if (!isAdmin) isAdmin = false;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [data, setData] = useState("");
  const [inform, setInform] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(
          "https://typastore.up.railway.app/product/" + id
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result);
        setProduct(result[0]);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    if (!userData || userData.length === 0) {
      setData(false);
    }
    setData(userData);
  }, []);

  const adminToken = data?.user?.role === "admin" ? data?.accessToken : null;

  const uploadItemImage = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("product", imageFile);

      const response = await fetch(
        "https://typastore.up.railway.app/product/upload-product-image/" + id,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + adminToken,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      setInform(true);
      setTimeout(() => setInform(false), 2000);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {product._id ? (
        <div className="mt-36 flex flex-wrap justify-center sm:grid sm:grid-cols-2 sm:grid-flow-row sm:gap-6 p-5">
          <div className="col-span-1">
            <img src={product?.img} alt="product img" />
          </div>
          <div className="col-span-1">
            <h2 className="text-xl font-semibold">
              Name:
              <span className="text-[#6d727b] ml-4">{product.name}</span>
            </h2>
            <p className="text-xl mt-4 font-semibold">
              discription :
              <span className="text-[#6d727b] ml-4">
                {" "}
                {product?.information}
              </span>
            </p>
            <div className="flex gap-4 mt-4  font-bold text-xl items-center">
              <span>price : </span>
              <del className=" text-[#6d727b]  block">{product?.price} L.E</del>
            </div>
            <p className="text-xl font-bold  mt-4">
              Price after discount:
              <span className="text-[#6d727b] ml-4">
                {product?.priceDiscount} L.E
              </span>
            </p>
            <p className="text-xl mt-4">
              Quantity:
              <span className="text-[#6d727b] ml-4">{product?.rest}</span>
            </p>
          </div>
        </div>
      ) : (
        <Spinner />
      )}

      {isAdmin && data && (
        <div className="mt-36">
          <form
            className="bg-[#6d727b] rounded p-6 shadow-md  md:w-[70%] mx-auto  mt-32"
            onSubmit={uploadItemImage}
          >
            <div className="mb-4">
              <label
                htmlFor="img"
                className="block mx-auto text-center text-[#f5f5f5]"
              >
                Image:
              </label>
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                required
                onChange={(e) => setImageFile(e.target.files[0])}
                className="mt-1 w-full md:w-1/2 mx-auto block  border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            {loading ? (
              <div className="w-fit mx-auto bg-slate-100 py-2">
                <Spinner className="bg-white" />
              </div>
            ) : error ? (
              <p>upload failed! please try again later!</p>
            ) : (
              <button
                type="submit"
                className="bg-yellow-500 transition-all duration-300 mx-auto block hover:bg-yellow-600 text-white py-2 px-4 rounded-md shadow-md"
              >
                Upload
              </button>
            )}
          </form>
          {inform && (
            <p className="text-green-500 text-xl text-center mt-4">
              Image uploaded successfully
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Product;
