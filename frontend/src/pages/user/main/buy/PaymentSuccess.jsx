import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTransactionStore } from "../../../../store/transactionStore";

export default function PaymentSuccess() {
  const { paymentSuccess, isLoading } = useTransactionStore();
  const [countDown, setCountDown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countDown]);

  useEffect(() => {
    if (countDown === 0) {
      navigate("/purchases");
      localStorage.removeItem("selectedOrderId");
    }
  }, [countDown]);

  return (
    <div className="bg-background/25 min-h-screen flex justify-center items-center">
      <div className="mx-5 bg-white p-10 rounded-2xl flex flex-col justify-center items-center gap-3 max-w-3xl">
        <img
          src="/orderConfirmed.svg"
          alt="Order Confirmed"
          className="md:w-1/2"
        />
        <h2 className="text-xl md:text-2xl font-semibold text-center my-5">
          Pembayaran Berhasil 🎉
        </h2>
        <p className="text-center">
          Terima kasih! Pembayaran Anda telah berhasil diterima. <br />
          Pesanan Anda kini sudah diteruskan ke penjual dan akan segera
          diproses.
        </p>
        <Link to="/purchases">
          <button className="bg-primaryDark font-semibold md:bg-primary py-3 px-10 rounded-xl hover:bg-primaryDark transition-colors duration-300">
            Lihat pesanan saya
          </button>
        </Link>

        <p className="text-center text-sm text-gray-500 mt-10">
          Halaman ini akan otomatis kembali ke halaman pesanan Anda dalam{" "}
          {countDown} detik
        </p>
      </div>
    </div>
  );
}
