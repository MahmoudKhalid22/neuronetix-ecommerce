import React from "react";
import { Link } from "react-router-dom";

function Verification() {
  return (
    <div className="w-[75%] mx-auto  flex items-center justify-center flex-col h-screen">
      <h2 className="text-4xl font-semibold  leading-loose text-center overflow-hidden text-[#0b1423]">
        Account has been registered successfully! please check your email to
        verify your account
      </h2>
      <Link to={"/register?mode=login"}>
        <button className="bg-[#ec981a] hover:bg-[#d48917] duration-300 transition-colors px-5 py-3 w-48 text-white text-2xl mt-8 mx-auto block">
          تسجيل الدخول
        </button>
      </Link>
    </div>
  );
}

export default Verification;
