import { Link } from "react-router-dom";

export default function EmailVerified() {
  return (
    <div className="bg-background min-h-svh flex flex-col justify-center items-center">
      <div className="mx-5 bg-white p-10 rounded-2xl flex flex-col justify-center items-center gap-3">
        <img src="/email.svg" alt="email" className="w-1/2 lg:w-5/12 mx-auto" />
        <h4 className="text-center text-2xl font-semibold mt-10">
          Selamat datang!
        </h4>
        <h5 className="text-center text-xl">
          Email Anda telah terverifikasi, dan Anda siap menikmati semua fitur
          aplikasi.
        </h5>

        <Link to="/">
          <button className="mt-10 font-medium bg-primaryDark md:bg-primary py-3 px-10 rounded-xl hover:bg-primaryDark transition-colors duration-300 text-xl">
            Kembali ke beranda
          </button>
        </Link>
      </div>
    </div>
  );
}
