import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Login Content Section */}
      <div className="flex flex-col justify-center items-center lg:w-2/5 px-4 lg:px-12 bg-white">
        {/* Mobile/Tablet Subtitle */}
        <div className="w-full max-w-sm mb-8 lg:hidden text-center mt-10">
          <div className="w-full flex justify-center items-center mb-4">
            <Link to="/" className="absolute left-0 ml-4">
              <IoIosArrowBack className="w-6 h-6" />
            </Link>
            {/* Tulisan Logo */}
            <h1 className="font-title text-3xl text-center relative">
              R<span className="text-secondary">e</span>Loved
              <span className="text-secondary">.</span>
            </h1>
          </div>
          {/* Subtitle */}
          <p className="text-gray-500 text-sm md:text-base text-center">
            <Link
              to="/"
              className="text-secondary font-semibold hover:underline"
            >
              Masuk
            </Link>{" "}
            dan temukan koleksi thrift terbaik
          </p>
        </div>

        {/* Desktop Logo and Subtitle */}
        <div className="w-full max-w-md mb-8 hidden lg:block">
          <div className="flex items-center gap-x-4 mb-4">
            {/* Arrow Icon for Desktop */}
            <Link to="/" className="transition text-black hover:text-secondary">
              <IoIosArrowBack className="w-6 h-6" />
            </Link>
            {/* Tulisan Logo */}
            <h1 className="font-title text-3xl">
              R<span className="text-secondary">e</span>Loved
              <span className="text-secondary">.</span>
            </h1>
          </div>
          {/* Subtitle */}
          <p className="text-gray-500 text-base ml-2">
            <Link
              to="/"
              className="text-secondary font-semibold hover:underline"
            >
              Masuk
            </Link>{" "}
            dan temukan koleksi thrift terbaik
          </p>
        </div>

        {/* Login Form */}
        <form className="max-w-md lg:max-w-lg w-full px-4 lg:px-2 sm:px-8 mx-auto">
          {/* Email Input */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm sm:text-base lg:text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@gmail.com"
              className="w-full p-3 sm:p-4 lg:p-3 border border-gray-300 rounded-md lg:rounded-lg text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
            />
          </div>

          {/* Password Input */}
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm sm:text-base lg:text-sm font-medium text-gray-700 mb-2"
            >
              Kata sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="********"
                className="w-full p-3 sm:p-4 lg:p-3 border border-gray-300 rounded-md lg:rounded-lg text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-secondary"
              >
                {showPassword ? (
                  <IoEyeOffOutline className="w-5 h-5" />
                ) : (
                  <IoEyeOutline className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-5">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold sm:text-base lg:text-sm text-secondary hover:underline"
            >
              Lupa kata sandi?
            </Link>
          </div>

          {/* Submit Button */}
          <Link
            to="/"
            className="w-full py-3 sm:py-4 lg:py-3 bg-primary text-black rounded-2xl lg:rounded-3xl font-semibold text-sm sm:text-base lg:text-md hover:bg-secondaryHover transition text-center inline-block"
          >
            Masuk
          </Link>

          {/* Register */}
          <div className="text-center mt-6">
            <p className="text-sm sm:text-base lg:text-sm font-medium text-gray-600">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-secondary hover:underline font-semibold"
              >
                Daftar
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block lg:w-2/3">
        <img
          src="/auth.png"
          alt="Clothing Items"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
