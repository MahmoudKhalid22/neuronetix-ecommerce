import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";
import { FaGooglePlus, FaFacebook } from "react-icons/fa";
import Spinner from "../utilsComponents/Spinner";
import { MdOutlineRemoveRedEye } from "react-icons/md";

function Form({ onSetIsLogin }) {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  // user data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const newUser = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(false);
    try {
      setLoading(true);
      const response = await fetch(
        "https://typastore.up.railway.app/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );
      console.log(await response.json());

      if (!response.ok) {
        setLoading(false);
        const errorData = await response.json();
        // console.log(errorData);
        throw new Error(errorData.err);
      }
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      navigate("/verify?message=verification");
    } catch (err) {
      // console.log(err.message);

      setError(
        err.message[0] === "E"
          ? "This email is already found, please try with another one"
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(false);

    try {
      setLoading(true);
      const response = await fetch(
        "https://typastore.up.railway.app/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      setError(null);
      if (!response.ok) {
        setLoading(false);
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // setLoading(false);
      const dataUser = await response.json();
      onSetIsLogin(true);
      localStorage.setItem("data", JSON.stringify(dataUser));
      navigate("/details");
      // Reset the form data
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const response = await fetch(
        "https://typastore.up.railway.app/user/auth/google"
      );
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`bg-none flex items-center
    justify-center flex-col gap-6 p-4 rounded-tr-xl rounded-br-xl w-full md:w-full md:h-[40rem]`}
      onSubmit={isLogin ? handleSubmit : newUser}
      style={{ width: "80%" }}
    >
      {!isLogin && (
        <div className=" flex flex-row-reverse justify-between items-start w-full">
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[100%]  md:h-16"
          />
          <label
            className="hidden md:block text-[#43766C] text-2xl"
            htmlFor="name"
          >
            Name
          </label>
        </div>
      )}
      <div className="flex flex-row-reverse justify-between items-start w-full">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          id="email"
          className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-16"
        />
        <label
          className="hidden md:block text-[#43766C] text-2xl"
          htmlFor="email"
        >
          email{" "}
        </label>
      </div>
      <div className="relative flex flex-row-reverse justify-between items-start w-full">
        <input
          type={`${showPassword ? "text" : "password"}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          id="pass"
          className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-16"
        />
        <span
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-3xl"
          onClick={() => setShowPassword(!showPassword)}
        >
          <MdOutlineRemoveRedEye />
        </span>
        <label
          className="hidden md:block text-[#43766C] text-2xl"
          htmlFor="pass"
        >
          password{" "}
        </label>
        {isLogin && (
          // <p className="absolute top-full right-0 mt-1 text-[#43766C] text-xl underline cursor-pointer">
          //   <Link to="/forgot-password">Forgot Password?</Link>
          // </p>
          <p className="absolute top-full right-0 mt-1 text-[#43766C] text-xl underline cursor-pointer">
            <Link to="/forget-password">Forgot Password?</Link>
          </p>
        )}
      </div>

      {/* <div className="flex justify-end w-full">
        <p className="text-[#43766C] text-xl underline cursor-pointer">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div> */}

      <p className="text-2xl text-red-800 text-center md:text-red-500">{`${
        error ? error : ""
      }`}</p>
      <div></div>
      {loading && <Spinner />}
      <button
        disabled={loading}
        className="p-2 border-slate-700  text-xl md:text-2xl cursor-pointer rounded-md transition-colors flex gap-2 items-center justify-center w-full md:h-16 bg-[#ec981a] hover:bg-[#d48917] text-[#fff] duration-300"
      >
        <GiExitDoor />
        {isLogin ? <span>دخول</span> : <span>تسجيل</span>}
      </button>
      <p className="flex flex-col items-center md:flex-row gap-4 text-[#2b2121] md:text-[#43766C]">
        {isLogin ? (
          <>
            <span>Don't have an account</span>
            <Link to="/register?mode=signup" className="underline text-center">
              register with new user now!
            </Link>
          </>
        ) : (
          <>
            <span className="text-center">Already have an account! </span>
            <Link to="/register?mode=login" className="underline">
              Login!
            </Link>
          </>
        )}
      </p>

      {/* <div className="flex gap-12">
        <button onClick={handleGoogleRegister}>
          <FaGooglePlus className="text-5xl fill-[#ec981a] hover:fill-[#d48917] " />
        </button>
        <button>
          <FaFacebook className="text-5xl  fill-[#ec981a] hover:fill-[#d48917] " />
        </button>
      </div> */}
    </form>
  );
}

export default Form;
