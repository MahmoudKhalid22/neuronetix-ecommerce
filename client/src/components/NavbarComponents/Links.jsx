import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { AiOutlineMenu } from "react-icons/ai";

import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { GiEntryDoor } from "react-icons/gi";
import { RxGear } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import Spinner from "../utilsComponents/Spinner";

const data = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : null;

function Links({ isLogin, onSetIsLogin }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(isLogin);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isLoggedInStatus = JSON.parse(localStorage.getItem("status"));
    setStatus(isLoggedInStatus);
  }, [isLogin]);

  const logout = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://typastore.up.railway.app/user/logout",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + data.accessToken,
          },
        }
      );
      setLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.error);
      }
      onSetIsLogin(false);
      localStorage.setItem("data", JSON.stringify([]));
      return navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 right-0 z-40 h-24 py-6 bg-[#fff] px-6 flex items-center justify-between w-full overflow-hidden">
      <Logo />
      <div className="flex items-center justify-between flex-col h-full   overflow-hidden">
        <ul
          onClick={() => setIsOpen(false)}
          className={`
          overflow-hidden
          transition-all
          h-auto
          duration-300
          flex
          gap-6

          md:flex-row
          md:items-center
          md:justify-center
          md:bg-transparent
          md:w-auto
          md:relative
          md:top-0
          md:max-h-auto
          md:py-6
          md:text-[#0b1423]
      

          flex-col 
        bg-[#6d727b]
          w-screen 
          fixed
          top-24 
          pl-8
           items-start justify-start 
          ${isOpen ? "max-h-[40rem] py-8" : "max-h-0"}
          text-white

          
          `}
        >
          <li className={`text-2xl font-medium`}>
            <HashLink smooth to="/#home">
              Home
            </HashLink>
          </li>
          <li className={`text-2xl font-medium`}>
            <HashLink smooth to="/#about">
              <p>About</p>
            </HashLink>
          </li>
          <li className={`text-2xl font-medium`}>
            <HashLink smooth to="/#products">
              <p>Products</p>
            </HashLink>
          </li>
          <li className={`text-2xl font-medium`}>
            <HashLink smooth to="/#contact">
              <p>Contact</p>
            </HashLink>
          </li>
          {!isLogin ? (
            <li className={`text-2xl font-medium`}>
              <HashLink to={"/register?mode=signup"}>
                <button
                  className="bg-[#ec981a] hover:bg-[#d48917] transition-colors h-11 rounded-md px-2 text-center 
              text-white text-2xl"
                >
                  Signup{" "}
                </button>
              </HashLink>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/details"
                  className=" border-none outline-none cursor-pointer rounded-lg transition-colors flex items-center justify-center text-[#f5f5f5] md:text-[#6d727b] "
                >
                  <div
                    className="block md:hidden bg-[#ec981a] hover:bg-[#d48917] transition-colors rounded-md px-2 text-center 
              text-white text-2xl"
                  >
                    Profile
                  </div>
                  <div className="text-3xl hidden md:block">
                    <CgProfile />
                  </div>
                </Link>
              </li>
              <li>
                {loading ? (
                  <Spinner />
                ) : (
                  <button
                    onClick={logout}
                    className=" border-none outline-none cursor-pointer rounded-lg transition-colors flex items-center justify-center text-[#f5f5f5] md:text-[#6d727b] "
                  >
                    <div
                      className="block md:hidden  transition-colors rounded-md px-2 text-center 
              text-white text-2xl"
                    >
                      logout
                    </div>
                    <div className="text-3xl hidden md:block">
                      <GiEntryDoor />
                    </div>
                  </button>
                )}
              </li>
            </>
          )}
        </ul>
        {/* {!isLogin && (
          <div className="flex flex-col gap-4">
            <Link
              to="/settings"
              className="text-center text-4xl lg:text-lg p-2 border-none outline-none cursor-pointer rounded-lg transition-colors flex items-center justify-center text-white hover:text-green-300"
            >
              <span>Dashboard</span>
              <div className="block lg:hidden">
                <RxGear />
              </div>
            </Link>
            {loading ? (
              <p className="text-center text-[#ececec] text-2xl">loading...</p>
            ) : error ? (
              <div className="text-center text-[#ececec] text-xl">
                <span>Internal error</span>
                <p
                  className="text-[0.5rem] sm:text-[0.75rem] cursor-pointer"
                  onClick={logout}
                >
                  logout again
                </p>
              </div>
            ) : (
              <button
                className="text-center text-4xl lg:text-lg p-2 border-none outline-none cursor-pointer rounded-lg transition-colors flex items-center justify-center text-white hover:text-green-300"
                onClick={logout}
                title="تسجيل الخروج"
              >
                <span>تسجيل الخروج</span>
                <div className="block lg:hidden">
                  <GiEntryDoor />
                </div>
              </button>
            )}
          </div>
        )} */}
      </div>
      <div
        className="text-2xl block md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AiOutlineMenu className="text-2xl block md:hidden" />
      </div>
    </div>
  );
}

export default Links;
