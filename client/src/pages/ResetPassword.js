import React from "react";
import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-md p-8">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <p className="text-gray-600 mb-6">Please enter your new password.</p>
        <form className="mb-6">
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#ec981a] hover:bg-[#d48917] text-white py-2 rounded-md transition duration-300"
          >
            Reset Password
          </button>
        </form>
        <p className="text-gray-600 text-center">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
