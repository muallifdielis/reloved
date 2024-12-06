import React, { useRef } from "react";

export default function EditProfile() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    console.log("Button clicked");
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };

  return (
    <form className="container flex flex-col gap-5">
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
        <img
          src="https://picsum.photos/200"
          alt="Profile Picture"
          className="w-36 h-36 rounded-full object-cover"
        />

        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <button
              onClick={handleButtonClick}
              type="button"
              className="bg-accent hover:bg-accentHover text-white transition-colors duration-300 px-5 py-2.5 rounded-xl"
            >
              Ubah foto
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <button
            className="bg-transparent border border-accent hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors duration-300 px-5 py-2 rounded-xl"
            type="button"
          >
            Hapus foto
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">
            Nama
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Masukkan nama Anda"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary block w-full p-2.5"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bio" className="text-sm font-medium">
            Bio
          </label>
          <input
            type="text"
            name="bio"
            id="bio"
            placeholder="Masukkan bio singkat Anda"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary block w-full p-2.5"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm font-medium">
            Nomor Telepon
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="+628123456789"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary block w-full p-2.5"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="address" className="text-sm font-medium">
            Alamat
          </label>
          <textarea
            name="address"
            id="address"
            placeholder="Masukkan alamat Anda"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary block w-full p-2.5"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-primary py-3 px-10 font-medium rounded-xl hover:bg-primaryDark transition-colors duration-300">
            Simpan perubahan
          </button>
        </div>
      </div>
    </form>
  );
}
