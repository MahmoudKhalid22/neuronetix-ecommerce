import React, { useEffect, useState } from "react";
import Spinner from "../components/utilsComponents/Spinner";

function AddProduct() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  // USER DATA
  const [name, setName] = useState("");
  const [information, setInformation] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [rest, setRest] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    setData(userData);
  }, []);

  if (!data || data.length === 0) {
    return <div>Please Login</div>;
  }
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const adminToken = data.user.role === "admin" ? data.accessToken : null;
      setLoading(true);
      const res = await fetch(
        "https://typa.onrender.com/product/create-product",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + adminToken,
          },
          body: JSON.stringify({
            name: name,
            information: information,
            price: price,
            priceDiscount: discount,
            rest: rest,
          }),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result);
      }
      setName("");
      setInformation("");
      setPrice(0);
      setDiscount(0);
      setRest(0);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={addProduct}
        className="bg-[#6d727b] rounded p-6 shadow-md  md:w-[70%] mx-auto mt-32 "
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
            required
            className="mt-1 w-full md:w-1/2 block mx-auto border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            required
            className="mt-1 w-full md:w-1/2 block mx-auto border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            required
            className="mt-1 w-full md:w-1/2 block mx-auto border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            value={discount}
            required
            className="mt-1 w-full md:w-1/2 block mx-auto border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => setDiscount(e.target.value)}
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
            required
            className="mt-1 w-full md:w-1/2 block mx-auto border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => setRest(e.target.value)}
          />
        </div>
        <div>
          <button
            disabled={loading}
            type="submit"
            className="bg-yellow-500 mx-auto text-center block text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            Add Product
          </button>
        </div>
        <div className="bg-white">
          {" "}
          {loading && <Spinner color="#f5f5f5" />}
        </div>
      </form>
    </>
  );
}

export default AddProduct;
