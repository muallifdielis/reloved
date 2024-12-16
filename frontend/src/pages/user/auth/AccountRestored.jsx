import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";
import { showErrorToast } from "../../../components/common/Toast";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

export default function AccountRestored() {
  const { restoreAccount, isLoading } = useUserStore();
  const { token } = useParams();
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const response = await restoreAccount(token);
      if (response.success) {
        setIsValid(true);
      } else {
        showErrorToast(
          response.data.message === "jwt expired"
            ? "Sesi Anda telah berakhir"
            : response.data.message
        );
        setIsValid(false);
      }
    };
    fetch();
  }, [token]);

  return (
    <div className="bg-background min-h-svh flex flex-col justify-center items-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="mx-5 bg-white p-10 rounded-2xl flex flex-col justify-center items-center gap-3 max-w-3xl">
          {isValid ? (
            <img
              src="/restore.svg"
              alt="success"
              className="w-1/2 lg:w-5/12 mx-auto"
            />
          ) : (
            <img
              src="/reject.svg"
              alt="warning"
              className="w-1/2 lg:w-5/12 mx-auto"
            />
          )}
          <h4 className="text-center text-2xl font-semibold mt-10">
            {isValid ? "Selamat datang kembali!" : "Akun Anda gagal dipulihkan"}
          </h4>
          <h5 className="text-center text-xl">
            {isValid
              ? "Akun Anda berhasil dipulihkan. Silakan login menggunakan akun Anda."
              : "Akun Anda gagal dipulihkan karena token tidak valid. Silakan hubungi admin untuk memulihkan akun Anda."}
          </h5>

          {isValid && (
            <Link to="/">
              <button className="mt-10 font-medium bg-primaryDark md:bg-primary py-3 px-10 rounded-xl hover:bg-primaryDark transition-colors duration-300 text-xl">
                Kembali ke beranda
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
