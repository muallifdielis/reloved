import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import EmailSent from "../../../components/modals/EmailSent";
import useAuthStore from "../../../store/authStore";

export default function ForgotPassword() {
  const [showModal, setShowModal] = useState(false);
  const { forgotPassword, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await forgotPassword(email);
    if (response.success) {
      setShowModal(true);
      setErrorMessage("");
    } else {
      setErrorMessage(response.data.message);
    }
  };

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
            <span className="text-secondary font-semibold">
              Lupa kata sandi?
            </span>{" "}
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
            <span className="text-secondary font-semibold">
              Lupa kata sandi?
            </span>{" "}
            Masukkan alamat email Anda untuk menerima tautan atur ulang kata
            sandi.
          </p>
        </div>

        {/* Email Form */}
        <form
          className="max-w-md lg:max-w-lg w-full px-4 lg:px-2 sm:px-8 mx-auto"
          onSubmit={handleSubmit}
        >
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
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 sm:p-4 lg:p-3 border border-gray-300 rounded-md lg:rounded-lg text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <div className="mt-10">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 sm:py-4 lg:py-3 bg-primary text-black rounded-2xl lg:rounded-3xl font-semibold text-sm sm:text-base lg:text-md hover:bg-secondaryHover transition text-center inline-block cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-primary"
            >
              {isLoading && (
                <span>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-2 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#4D3A2D"
                    />
                  </svg>
                </span>
              )}{" "}
              Kirim Tautan
            </button>
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

      {showModal && (
        <EmailSent
          title={"Tautan atur ulang kata sandi berhasil dikirim ✅"}
          message={
            "Silakan cek email Anda untuk melihat tautan atur ulang kata sandi."
          }
        />
      )}
    </div>
  );
}
