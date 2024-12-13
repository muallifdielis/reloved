import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAuthStore from "../../../store/authStore";

import EmailSent from "../../../components/modals/EmailSent";

export default function SignUp() {
  const { register, isLoading } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Memfilter input berdasarkan jenis field
    let filteredValue = value;
    if (name === "name") {
      // Hanya izinkan huruf dan spasi
      filteredValue = value.replace(/[^A-Za-z\s]/g, "").slice(0, 50);
    }

    if (name === "phone") {
      // Hanya izinkan angka dan batasi hingga 16 digit
      filteredValue = value.replace(/\D/g, "").slice(0, 16);
    }

    // Perbarui formData
    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue,
    }));

    // Memeriksa apakah kata sandi memiliki minimal 6 karakter
    if (name === "password") {
      if (value.length < 6) {
        setErrorMessage("Kata sandi harus memiliki minimal 6 karakter.");
      } else {
        setErrorMessage("");
      }
    }

    // Memeriksa apakah kata sandi dan konfirmasi kata sandi sama
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setErrorMessage("Kata sandi dan konfirmasi kata sandi harus sama.");
      } else {
        setErrorMessage("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Memeriksa apakah semua field telah diisi
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage("Semua field harus diisi.");
      return;
    }

    // Memeriksa apakah nama terdiri dari minimal 3 karakter
    if (formData.name.length < 3) {
      setErrorMessage("Nama harus memiliki minimal 3 karakter.");
      return;
    }

    // Memeriksa apakah username terdiri dari minimal 3 karakter
    if (formData.username.length < 3) {
      setErrorMessage("Username harus memiliki minimal 3 karakter.");
      return;
    }

    // Memeriksa apakah email memiliki format yang benar
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Format email tidak valid.");
      return;
    }

    // Memeriksa apakah nomor telepon terdiri dari minimal 10 angka dan maksimal 16
    if (formData.phone.length < 10 || formData.phone.length > 16) {
      setErrorMessage("Nomor telepon harus memiliki minimal 10 angka.");
      return;
    }

    // Memeriksa apakah kata sandi memiliki minimal 6 karakter
    if (formData.password.length < 6) {
      setErrorMessage("Kata sandi harus memiliki minimal 6 karakter.");
      return;
    }

    // Memeriksa apakah kata sandi dan konfirmasi kata sandi sama
    if (formData.confirmPassword !== formData.password) {
      setErrorMessage("Kata sandi dan konfirmasi kata sandi harus sama.");
      return;
    }

    const response = await register(
      formData.name,
      formData.username,
      formData.email,
      formData.phone,
      formData.password
    );
    if (response.success) {
      setErrorMessage("");
      setShowModal(true);
      setFormData({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setErrorMessage(response.data.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:min-h-screen">
      {/* Bagian Konten Pendaftaran */}
      <div className="flex flex-col justify-center items-center lg:w-2/5 px-4 lg:px-16 bg-white pb-8">
        {/* untuk Mobile/Tablet */}
        <div className="w-full max-w-sm mb-8 lg:hidden text-center mt-8">
          <div className="w-full flex justify-center items-center mb-4">
            <Link to="/" className="absolute left-0 ml-4">
              <IoIosArrowBack className="w-6 h-6" />
            </Link>
            {/* Teks Logo */}
            <h1 className="font-title text-3xl text-center relative">
              R<span className="text-secondary">e</span>Loved
              <span className="text-secondary">.</span>
            </h1>
          </div>
          {/* Subtitle */}
          <p className="text-gray-500 text-sm md:text-base text-center">
            <span className="text-secondary font-semibold hover:underline">
              Daftar sekarang
            </span>{" "}
            dan temukan koleksi thrift terbaik
          </p>
        </div>

        {/* Logo dan Subtitle untuk Desktop */}
        <div className="relative z-10 w-full max-w-md mb-2 hidden lg:block lg:mt-4 pt-12">
          <div className="flex items-center gap-x-4 mb-2">
            <Link to="/" className="transition text-black hover:text-secondary">
              <IoIosArrowBack className="w-6 h-6" />
            </Link>
            {/* Teks Logo */}
            <h1 className="font-title text-3xl">
              R<span className="text-secondary">e</span>Loved
              <span className="text-secondary">.</span>
            </h1>
          </div>
          {/* Subtitle */}
          <p className="text-gray-500 text-base ml-2 mb-6">
            <span className="text-secondary font-semibold">
              Daftar sekarang
            </span>{" "}
            dan temukan koleksi thrift terbaik
          </p>
        </div>

        {/* Formulir Pendaftaran */}
        <form
          className="max-w-md lg:max-w-lg w-full px-4 lg:px-2 sm:px-8 mx-auto"
          onSubmit={handleSubmit}
        >
          {/* Input Nama Lengkap */}
          <div className="mb-5">
            <label
              htmlFor="fullName"
              className="block text-sm sm:text-base lg:text-sm font-medium text-gray-700 mb-2"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Masukkan Nama"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 sm:p-4 lg:p-3 border border-gray-300 rounded-md lg:rounded-lg text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
            />
          </div>

          {/* Input Username */}
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-sm sm:text-base lg:text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Masukkan Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 sm:p-4 lg:p-3 border border-gray-300 rounded-md lg:rounded-lg lowercase text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
            />
          </div>

          {/* Input Email */}
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
              placeholder="Masukkan Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 sm:p-4 lg:p-3 border border-gray-300 rounded-md lg:rounded-lg lowercase text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
            />
          </div>

          {/* Input Nomor Telepon */}
          <div className="mb-5">
            <label
              htmlFor="phoneNumber"
              className="block text-sm sm:text-base lg:text-sm font-medium text-gray-700 mb-2"
            >
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Masukkan Nomor Telepon"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 sm:p-4 lg:p-3 border border-gray-300 rounded-md lg:rounded-lg text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
            />
          </div>

          {/* Input Kata Sandi */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm sm:text-base lg:text-sm font-medium text-gray-700 mb-2"
            >
              Kata sandi
            </label>
            <div className="relative">
              <input
                type={showPassword.password ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 lg:p-3 border border-gray-300 rounded-md lg:rounded-lg text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("password")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-secondary"
              >
                {showPassword.password ? (
                  <IoEyeOffOutline className="w-5 h-5" />
                ) : (
                  <IoEyeOutline className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Input Konfirmasi Kata Sandi */}
          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block text-sm sm:text-base lg:text-sm font-medium text-gray-700 mb-2"
            >
              Konfirmasi Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                id="confirmPassword"
                placeholder="••••••••"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 lg:p-3 border border-gray-300 rounded-md lg:rounded-lg text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-secondary"
              >
                {showPassword.confirm ? (
                  <IoEyeOffOutline className="w-5 h-5" />
                ) : (
                  <IoEyeOutline className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-5">
              <p className="text-red-500 text-sm sm:text-base lg:text-sm">
                {errorMessage} Silakan coba lagi.
              </p>
            </div>
          )}

          {/* Submit Button */}
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
            )}
            Daftar
          </button>

          {/* Register */}
          <div className="text-center mt-4 mb-2 lg:mb-16">
            <p className="text-sm sm:text-base lg:text-sm font-medium text-gray-600">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-secondary hover:underline font-semibold rounded-2xl"
              >
                Masuk
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="hidden lg:block lg:w-2/3">
        <img
          src="/auth.png"
          alt="Clothing Items"
          className="absolute lg:fixed lg:top-0 lg:right-0 lg:pl-16 lg:w-2/3 lg:h-screen object-cover z-0"
        />
      </div>

      {/* Popup Registrasi Berhasil */}
      {showModal && (
        <EmailSent
          title={"Registrasi Berhasil ✅"}
          message={
            "Terima kasih telah mendaftar! Kami telah mengirimkan email verifikasi ke alamat email Anda. Silakan periksa Inbox atau folder Spam."
          }
        />
      )}
    </div>
  );
}
