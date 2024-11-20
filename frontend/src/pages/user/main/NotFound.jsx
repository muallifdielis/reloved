import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <img src="./notFound.gif" alt="Not Found" className="" />
      <h2 className="text-2xl font-semibold text-center">
        Halaman yang Anda cari tidak ditemukan.
      </h2>
      <Link to="/">
        <button className="bg-primaryDark md:bg-primary py-3 px-10 mt-5 rounded-xl hover:bg-primaryDark transition-colors duration-300">
          Kembali ke beranda
        </button>
      </Link>
    </div>
  );
}
