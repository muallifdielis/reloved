import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EmailSent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className={`bg-white p-8 rounded-lg transform transition-all duration-300 w-5/12 mx-5 flex flex-col items-center ${
          show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <img
          src="/message.svg"
          alt="Email"
          className="w-1/2 lg:w-5/12 mx-auto"
        />
        <h2 className="text-lg font-semibold mt-10 mb-2 text-center">
          Registrasi Berhasil ✅
        </h2>
        <p className="text-center text-sm mb-10">
          {" "}
          Terima kasih telah mendaftar! Kami telah mengirimkan email verifikasi
          ke alamat email Anda. Silakan periksa <b>Inbox</b> atau folder{" "}
          <b>Spam</b>.
        </p>

        <Link to="/">
          <button className=" font-medium bg-primaryDark md:bg-primary py-3 px-10 rounded-xl hover:bg-primaryDark transition-colors duration-300">
            Kembali ke Beranda
          </button>
        </Link>
      </div>
    </div>
  );
}
