import React from "react";
import logo from "../../assets/logo.png";
import { HashLink } from "react-router-hash-link";

function Logo() {
  return (
    <div className="">
      <HashLink smooth to={"/#home"}>
        <img className="" src={logo} alt="logo" />
      </HashLink>
    </div>
  );
}

export default Logo;
