import React from "react";
import { Link } from "react-router-dom";

const BadRequestPage = () => {
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
};

export default BadRequestPage;
