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
  // UPDATE PRODUCT
  const [name, setName] = useState("");
  const [information, setInformation] = useState("");
  const [price, setPrice] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [rest, setRest] = useState(0);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch("https://typa.onrender.com/product/" + id);
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
        "https://typa.onrender.com/product/upload-product-image/" + id,
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

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("https://typa.onrender.com/product/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + adminToken,
        },
        body: JSON.stringify({
          name: name.trim().length > 0 ? name : undefined,
          information: information.trim().length > 0 ? information : undefined,
          price: price > 0 ? price : undefined,
          priceDiscount: priceDiscount,
          rest: rest,
        }),
      });
      const result = await res.json();
      console.log(result);
      if (!res.ok) throw new Error(result);

      setProduct(result);
      setName("");
      setInformation("");
      setPrice(0);
      setPriceDiscount(0);
      setRest(0);
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
              {product?.priceDiscount > 0 ? (
                <del className=" text-[#6d727b]  block">
                  {product?.price} L.E
                </del>
              ) : (
                <p className=" text-[#6d727b]  block">{product?.price} L.E</p>
              )}
            </div>
            {product?.priceDiscount > 0 && (
              <p className="text-xl font-bold  mt-4">
                Price after discount:
                <span className="text-[#6d727b] ml-4">
                  {product?.priceDiscount} L.E
                </span>
              </p>
            )}
            {product?.rest > 0 && (
              <p className="text-xl mt-4">
                Quantity:
                <span className="text-[#6d727b] ml-4">{product?.rest}</span>
              </p>
            )}
          </div>
        </div>
      ) : (
        <Spinner />
      )}

      {isAdmin && data && (
        <div className="mt-4 border-t-teal-950 border">
          <form
            className="bg-[#6d727b] p-6 shadow-md w-[90%] rounded-md md:w-[70%] mx-auto  mt-8"
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
                className="py-2 px-4 text-lg mt-1 w-full md:w-1/2 mx-auto block  border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-slate-50"
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
                className="bg-yellow-500 transition-all duration-300 mx-auto block hover:bg-yellow-600 text-[#0b1423] py-2 px-4 rounded-md shadow-md"
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

          <form
            onSubmit={updateItem}
            className="bg-[#6d727b] rounded p-6 shadow-md w-[90%]  md:w-[70%] mx-auto mt-8 mb-16"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mx-auto text-center text-[#f5f5f5]"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                className="py-2 px-4 text-lg mt-1 w-full md:w-1/2 block mx-auto border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="information"
                className="block mx-auto text-center text-[#f5f5f5]"
              >
                Information:
              </label>
              <textarea
                id="information"
                name="information"
                value={information}
                className="py-2 px-4 text-lg mt-1 w-full md:w-1/2 block mx-auto border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setInformation(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block mx-auto text-center text-[#f5f5f5]"
              >
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                className="py-2 px-4 text-lg mt-1 w-full md:w-1/2 block mx-auto border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="priceDiscount"
                className="block mx-auto text-center text-[#f5f5f5]"
              >
                Discount Price:
              </label>
              <input
                type="number"
                id="priceDiscount"
                name="priceDiscount"
                value={priceDiscount}
                className="py-2 px-4 text-lg mt-1 w-full md:w-1/2 block mx-auto border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setPriceDiscount(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="rest"
                className="block mx-auto text-center text-[#f5f5f5]"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="rest"
                name="rest"
                value={rest}
                className="py-2 px-4 text-lg mt-1 w-full md:w-1/2 block mx-auto border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setRest(e.target.value)}
              />
            </div>
            <div>
              <button
                disabled={loading}
                type="submit"
                className="bg-yellow-500 mx-auto text-center block text-[#0b1423] py-2 px-4 rounded hover:bg-yellow-600"
              >
                Update Product
              </button>
            </div>
            <div className="bg-white">
              {" "}
              {loading && <Spinner color="#f5f5f5" />}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Product;
