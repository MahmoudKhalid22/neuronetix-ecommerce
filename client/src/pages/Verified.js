import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Verified = () => {
  return (
    <div className=" h-screen flex flex-col text-center gap-8 leading-loose items-center justify-center text-5xl">
      <FaCheckCircle className="fill-[#6d727b]" />
      <p className="w-[80%]">
        Congratulations! your email has been verified! you can login now
      </p>
      <Link
        to="/register?mode=login"
        className="bg-[#6d727b] hover:bg-[#62676f] transition-colors px-5 py-3 w-48 text-white text-2xl hidden lg:block"
      >
        Login
      </Link>
    </div>
  );
};

export default Verified;
