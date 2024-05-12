import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/utilsComponents/Spinner";

function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEamil] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForget = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://typastore.up.railway.app/user/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );
      const result = await res.json();
      console.log(result);
      if (!res.ok) {
        console.log(result);
        throw new Error(result.message);
      }
      navigate("/verify?message=forgot");
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-md p-8">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-6">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>
        <form className="mb-6" onSubmit={handleForget}>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            onChange={(e) => setEamil(e.target.value)}
          />
          <button
            type="submit"
            className="mt-4 w-full bg-[#ec981a] hover:bg-[#d48917] text-white py-2 rounded-md  transition duration-300"
          >
            Reset Password
          </button>
          <div className="mt-4">
            {loading && <Spinner />}
            {err.length > 0 && (
              <p className="text-xl text-center text-red-600">{err}</p>
            )}
          </div>
        </form>
        <p className="text-gray-600 text-center">
          Remember your password?{" "}
          <Link
            to="/register?mode=login"
            className="text-[#af7f37] hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;
