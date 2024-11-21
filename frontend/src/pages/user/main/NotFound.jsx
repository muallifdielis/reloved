import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen mx-10">
      <img src="/error.svg" alt="Error" className="lg:w-5/12 h-auto mb-5" />
      <h2 className="text-2xl font-semibold text-center my-5">
        Halaman yang Anda cari tidak ditemukan.
      </h2>
      <Link to="/">
        <button className="bg-primaryDark md:bg-primary py-3 px-10 rounded-xl hover:bg-primaryDark transition-colors duration-300">
          Kembali ke beranda
        </button>
      </Link>
    </div>
  );
}
