import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/utilsComponents/Spinner";
const Product = () => {
  const { id } = useParams();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [data, setData] = useState("");
  const [inform, setInform] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    if (!userData || userData.length === 0) {
      setData(false);
    }
    setData(userData);
  }, []);
  if (!data) {
    return <div>you are not the admin</div>;
  }
  const adminToken = data?.user?.role === "admin" ? data?.accessToken : null;
  const uploadItemImage = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("product", imageFile);

      const response = await fetch(
        "http://localhost:5000/product/upload-product-image/" + id,
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
  );
};

export default Product;
