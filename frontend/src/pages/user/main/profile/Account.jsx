import { IoIosCheckmarkCircle, IoMdRefresh } from "react-icons/io";
import useAuthStore from "../../../../store/authStore";
import { useOrderStore } from "../../../../store/orderStore";
import { useEffect, useState } from "react";
import { ckb } from "date-fns/locale";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common/Toast";
import Danger from "../../../../components/modals/Danger";
import { useUserStore } from "../../../../store/userStore";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const {
    currentUser,
    resendEmailVerification,
    isLoading: isAuthLoading,
  } = useAuthStore();
  const { deleteAccount, softDeleteAccount } = useUserStore();
  const { orders, getOrders, isLoading } = useOrderStore();
  const [isAllowed, setIsAllowed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    getOrders();

    const isMultipleInProcess =
      orders?.filter((order) => order.status === "proses").length >= 1;
    const isUserVerified = currentUser?.isVerified;

    setIsAllowed(!isMultipleInProcess && isUserVerified === true);
  }, []);

  const handleResend = async (email) => {
    try {
      const response = await resendEmailVerification({ email });
      if (response.success === false) {
        showErrorToast(response?.data?.message || "Terjadi kesalahan");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (orders?.filter((order) => order.status === "proses").length >= 1) {
      showErrorToast("Anda masih memiliki pesanan dalam proses");
      return;
    }
    if (currentUser?.isVerified === false) {
      showErrorToast("Anda belum memverifikasi email");
      return;
    }
    if (!isValid) {
      showErrorToast("Kode CAPTCHA tidak sesuai");
      return;
    }

    try {
      // const response = await deleteAccount();
      const response = await softDeleteAccount();
      if (response.success) {
        showSuccessToast("Akun berhasil dihapus");
        navigate("/");
      } else {
        showErrorToast(response?.data?.message || "Terjadi kesalahan");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowCaptha = () => {
    setShowCaptcha(true);
    setShowModal(false);
  };

  useEffect(() => {
    generateCaptchaCode();
  }, [showCaptcha]);

  // MEMBUAT KODE CAPTCHA
  const generateCaptchaCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaCode(code);
    setIsValid(false);
  };

  // MEMVALIDASI KODE CAPTCHA
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
    if (e.target.value === captchaCode) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <>
      {isLoading || isAuthLoading ? (
        <div className="flex justify-center items-center w-full">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="container flex flex-col">
          {/* EMAIL */}
          <div className="flex flex-col gap-1 border-2 border-secondary rounded-lg px-4 py-2">
            <h4>Email</h4>
            <div className="flex flex-row items-center justify-between flex-shrink-0">
              <p className="text-sm text-gray-500">{currentUser?.email}</p>
              {currentUser?.isVerified ? (
                <IoIosCheckmarkCircle className="text-green-500 text-2xl" />
              ) : (
                <button
                  onClick={() => handleResend(currentUser?.email)}
                  className="text-sm bg-accent text-white px-4 py-1 rounded-lg"
                >
                  Verifikasi
                </button>
              )}
            </div>
          </div>
          {currentUser?.isVerified === false && (
            <p className="text-sm text-red-500 mt-1">
              Email belum terverifikasi
            </p>
          )}

          {/* DELETE ACCOUNT */}
          <div
            className={
              "flex flex-col md:flex-row justify-between md:items-center gap-1 border-2 mt-5 border-secondary rounded-lg px-4 py-2"
            }
          >
            <div className="flex flex-col gap-1">
              <h4 className="">Hapus Akun</h4>
              <p className="text-sm text-gray-500">
                Setelah akun dihapus, Anda tidak akan bisa mengakses
                data-datanya untuk selamanya.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                disabled={!isAllowed}
                onClick={() => setShowModal(true)}
                className="text-sm w-max bg-red-600 hover:bg-red-800 text-white px-4 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
          {!isAllowed && (
            <p className="text-sm text-gray-500 mt-1">
              Anda harus verifikasi email dan menyelesaikan semua pesanan
              sebelum menghapus akun
            </p>
          )}

          {showModal && (
            <Danger
              title="Hapus Akun"
              message="Apakah Anda yakin ingin menghapus akun Anda? Setelah akun dihapus, Anda tidak akan bisa mengakses data-datanya untuk selamanya."
              onSubmit={handleShowCaptha}
              onClose={() => setShowModal(false)}
            />
          )}

          {showCaptcha && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 w-full max-w-md rounded-lg transform transition-all duration-300 mx-5">
                <div className="flex justify-center flex-col items-center text-center">
                  <h2 className="text-lg font-medium mb-4">
                    Masukkan Kode Captcha
                  </h2>
                  <div className="flex justify-center items-start mb-4">
                    <div
                      style={{
                        backgroundImage: "url(/captcha.png)",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                      className="py-3 px-4 object-cover"
                    >
                      <div className="relative select-none">
                        {captchaCode.split("").map((char, index) => (
                          <span
                            key={index}
                            className={`${
                              index % 2 === 0 ? "top-0" : "top-2"
                            } text-2xl font-bold relative`}
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      className="ml-4 text-sm font-bold text-gray-600 hover:text-gray-900"
                      onClick={generateCaptchaCode}
                    >
                      <IoMdRefresh className="text-xl" />
                    </button>
                  </div>
                  <form onSubmit={handleDelete} className="w-full">
                    <div
                      className={`flex items-center p-2 rounded-xl border border-black focus-within:shadow-lg w-10/12 mx-auto
                    ${
                      userInput && isValid
                        ? "focus-within:border-[#28A745] border-[#8A8A8A]"
                        : ""
                    }
                    ${
                      userInput && !isValid
                        ? "focus-within:border-[#FF0000] border-[#8A8A8A]"
                        : ""
                    }`}
                    >
                      <input
                        className="flex-grow bg-transparent border-none focus:outline-none text-sm"
                        type="text"
                        value={userInput}
                        onChange={handleUserInput}
                        placeholder="Masukkan Kode Captcha"
                      />
                    </div>
                    {userInput && !isValid && (
                      <p className="text-[#FF0000] mt-2">
                        Captcha tidak sesuai!
                      </p>
                    )}
                    {userInput && isValid && (
                      <p className="text-[#28A745] mt-2">
                        Captcha sudah sesuai!
                      </p>
                    )}

                    <div className="flex justify-end gap-4 items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setShowCaptcha(false), setUserInput("");
                        }}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg mt-2"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={!isValid}
                        className="px-4 py-2 bg-[#FF0000] hover:bg-red-600 text-white font-medium rounded-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Hapus Akun
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
