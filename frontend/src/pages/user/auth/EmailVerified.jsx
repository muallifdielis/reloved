import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { useEffect, useState } from "react";
import { decodeToken } from "../../../utils/tokenManager";
import { showErrorToast } from "../../../components/common/Toast";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

export default function EmailVerified() {
  const { verifyEmail, resendEmailVerification, isLoading } = useAuthStore();
  const { token } = useParams();
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const response = await verifyEmail(token);

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

    setEmail(decodeToken(token).id.email);
    fetch();
  }, [token]);

  const handleResend = async () => {
    const response = await resendEmailVerification({ email });
    if (response.success) {
      navigate("/");
    } else {
      showErrorToast(response.data.message);
      if (response.data.message === "Email sudah diverifikasi") {
        navigate("/");
      }
    }
  };

  return (
    <div className="bg-background min-h-svh flex flex-col justify-center items-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="mx-5 bg-white p-10 rounded-2xl flex flex-col justify-center items-center gap-3 max-w-3xl">
          {isValid ? (
            <img
              src="/email.svg"
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
            {isValid ? "Selamat datang!" : "Email Anda gagal terverifikasi"}
          </h4>
          <h5 className="text-center text-xl">
            {isValid
              ? "Email Anda telah terverifikasi, dan Anda siap menikmati semua fitur aplikasi."
              : "Email Anda gagal terverifikasi karena token tidak valid. Silakan tekan tombol dibawah untuk melakukan verifikasi ulang."}
          </h5>

          {isValid ? (
            <Link to="/">
              <button className="mt-10 font-medium bg-primaryDark md:bg-primary py-3 px-10 rounded-xl hover:bg-primaryDark transition-colors duration-300 text-xl">
                Kembali ke beranda
              </button>
            </Link>
          ) : (
            <button
              onClick={() => handleResend()}
              className="mt-10 font-medium bg-primaryDark md:bg-primary py-3 px-10 rounded-xl hover:bg-primaryDark transition-colors duration-300 text-xl"
            >
              Verifikasi ulang
            </button>
          )}
        </div>
      )}
    </div>
  );
}
