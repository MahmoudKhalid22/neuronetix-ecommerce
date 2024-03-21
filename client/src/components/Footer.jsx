import React from "react";
import { HashLink } from "react-router-hash-link";

function Footer() {
  return (
    <footer className="h-60 mt-36 px-6 w-full bg-[#0b1423]">
      <ul className="h-[11.5rem]  md:flex md:flex-row grid grid-cols-2 items-center justify-center gap-12">
        <li className="text-md sm:text-2xl text-white">
          <HashLink smooth to="/#home">
            Home
          </HashLink>
        </li>
        <li className="text-md sm:text-2xl text-white">
          <HashLink smooth to={"/#about"}>
            About{" "}
          </HashLink>
        </li>
        <li className="text-md sm:text-2xl text-white">
          <HashLink smooth to={"/#products"}>
            Products{" "}
          </HashLink>
        </li>
        <li className="text-md sm:text-2xl text-white">
          <HashLink smooth to={"/#contact"}>
            Contact
          </HashLink>
        </li>
      </ul>

      {/* /* 
  primary color => f5f5f5
  secondry color => fff
  button color (dark green) => 6d727b
  another button color (yellow) => ec981a
  another color => 0b1423
*/}

      <div className="bg-[#ec981a] shadow-[0_-2px_5.6px_1px_rgba(0,0,0,0.25)] text-[#0b1423] flex flex-wrap text-center items-center justify-center absolute bottom-0 w-full left-0 gap-1 px-8 sm:px-1 py-2">
        <p className="text-[0.5rem] sm:text-sm md:text-lg">
          ©All rights reserved, Designed with ♥ by
        </p>
        <span className="text-left font-semibold text-[#554a38] text-[0.5rem] sm:text-sm md:text-xl">
          Mahmoud Khalid
        </span>
      </div>
    </footer>
  );
}

export default Footer;
