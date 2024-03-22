import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "./utilsComponents/Spinner";

function Details({ onSetIsLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({});

  const data = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data"))
    : null;

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://typa.onrender.com/user/me/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.accessToken,
          },
        });
        if (!response.ok) {
          throw new Error();
        }

        const result = await response.json();
        setUserData(result[0]);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [data?.accessToken]);

  if (!data || data.length === 0) {
    return (
      <div className="overflow-hidden h-screen flex flex-col items-center justify-center">
        <h2 className="text-red-700 text-3xl font-semibold text-center overflow-y-hidden">
          Please Login!
        </h2>
        <Link
          to="/register?mode=login"
          className="text-white bg-[#0b1423] text-2xl  text-center mx-auto block mt-12 w-36 p-4  hover:bg-[#0b1527] transition-colors"
        >
          Login{" "}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-32">
      {error ? (
        <p className="text-red-600 font-semibold text-2xl mx-auto text-center">
          حدث بعض الخطأ
        </p>
      ) : loading ? (
        <Spinner />
      ) : (
        <div className="w-full absolute left-0 flex flex-col items-center justify-center gap-2 sm:gap-4">
          <img
            src={userData?.avatar ? userData?.avatar : "/assets/dummyImage.jpg"}
            alt={userData?.name}
            className="rounded-full w-40 h-40 object-cover "
          />
          <p className="text-center text-xl sm:text-3xl text-[#43766C]">
            {userData?.name}
          </p>
          <p className="text-center text-xl sm:text-3xl text-[#43766C]">
            {userData?.role === "admin"
              ? "admin"
              : userData?.role === "user"
              ? "user"
              : ""}
          </p>

          {userData?.role === "admin" && (
            <>
              <Link
                to={`/add-product`}
                className="bg-[#0b1423] hover:bg-[#0b1423] transition-colors duration-300 text-[#f5f5f5] rounded-sm px-4 py-2"
              >
                add product
              </Link>
              <Link
                to="/products?admin=true"
                className="bg-[#0b1423] hover:bg-[#0b1423] transition-colors duration-300 text-[#f5f5f5] rounded-sm px-4 py-2"
              >
                get products
              </Link>
            </>
          )}

          {userData?.role === "teacher" && (
            <>
              <p className="text-center ml-4 text-xl sm:text-3xl font-bold text-[#43766C]">
                {userData?.price} ج
              </p>

              <p className="text-center ml-2 text-md sm:text-xl   text-[#43766C] w-[95%] mt-4 sm:mt-12 leading-loose font-semibold">
                وصف طريقة التعليم
              </p>
              <p className="text-center ml-2 text-md sm:text-xl   text-[#43766C] lg:w-[50rem] w-[90%] leading-loose">
                {userData?.information}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Details;
