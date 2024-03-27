import React from "react";
import { HashLink } from "react-router-hash-link";

function Proposal({ onSetActiveLink, observer }) {
  return (
    <div
      id="home"
      className="px-6 pt-24 flex items-start min-h-screen justify-center flex-col overflow-x-hidden"
    >
      <h1 className="font-bold text-xl sm:text-3xl block">
        <span className="text-[#ec981a] text-2xl sm:text-4xl">
          {" "}
          Typa Electronics -{" "}
        </span>
        Your Destination for Premium Printers{" "}
      </h1>
      <p className="mt-4 leading-[1.5rem] sm:leading-[2.5rem]  text-sm sm:text-[1.5rem] sm:w-[60%]">
        Welcome to Typa Electronics, where we specialize in providing
        exceptional printing solutions for every need. From sleek home printers
        to robust office machines, we offer a curated selection of high-quality
        devices to suit your requirements. With Typa, you'll experience
        unparalleled performance, reliability, and innovation in every print.
        Explore our range today and discover the perfect printer for your needs.
      </p>
      <div className="flex sm:flex-row flex-col justify-start items-start mt-16 gap-8 sm:gap-0">
        <HashLink smooth to={"/#products"}>
          <button className="py-1 sm:py-2 px-2 sm:px-4 text-sm sm:text-xl bg-[#ec981a] hover:bg-[#d48917] text-[#f5f5f5] transition-colors duration-300 rounded-sm ">
            Explore Products
          </button>
        </HashLink>
      </div>
    </div>
  );
}

export default Proposal;
