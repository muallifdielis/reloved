import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex flex-col justify-center items-center lg:w-2/5 px-4 lg:px-12 bg-white">
        {/* Mobile/Tablet */}
        <div className="w-full max-w-sm mb-8 lg:hidden text-center mt-10">
          <div className="w-full flex justify-center items-center mb-4">
            <Link to="/login" className="absolute left-0 ml-4">
              <IoIosArrowBack className="w-6 h-6" />
            </Link>

            <h1 className="font-title text-3xl text-center relative">
              R<span className="text-secondary">e</span>Loved
              <span className="text-secondary">.</span>
            </h1>
          </div>

          <p className="text-gray-500 text-sm md:text-base text-center">
            <Link
              to="/forgot-password"
              className="text-secondary font-semibold hover:underline"
            >
              Lupa kata sandi?
            </Link>{" "}
            Masukkan alamat email Anda untuk menerima tautan atur ulang kata
            sandi.
          </p>
        </div>

        {/* Desktop Logo and Subtitle */}
        <div className="w-full max-w-md mb-8 hidden lg:block">
          <div className="flex items-center gap-x-4 mb-4">
            <Link
              to="/login"
              className="transition text-black hover:text-secondary"
            >
              <IoIosArrowBack className="w-6 h-6" />
            </Link>
            {/* Logo Text */}
            <h1 className="font-title text-3xl">
              R<span className="text-secondary">e</span>Loved
              <span className="text-secondary">.</span>
            </h1>
          </div>
          {/* Subtitle */}
          <p className="text-gray-500 text-base ml-2">
            <Link
              to="/forgot-password"
              className="text-secondary font-semibold hover:underline"
            >
              Lupa kata sandi?
            </Link>{" "}
            Masukkan alamat email Anda untuk menerima tautan atur ulang kata
            sandi.
          </p>
        </div>

        {/* Email Form */}
        <form className="max-w-md lg:max-w-lg w-full px-4 lg:px-2 sm:px-8 mx-auto">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm sm:text-base lg:text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Masukkan alamat email"
              className="w-full p-3 sm:p-4 lg:p-3 border border-gray-300 rounded-md lg:rounded-lg text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
            />
          </div>

          <div className="mt-10">
            <Link
              to="/reset-password"
              className="w-full py-3 sm:py-4 lg:py-3 bg-primary text-black rounded-2xl lg:rounded-3xl font-semibold text-sm sm:text-base lg:text-md hover:bg-secondaryHover transition text-center inline-block"
            >
              Kirim Tautan
            </Link>
          </div>
        </form>
      </div>

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
