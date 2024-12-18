import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTransactionStore } from "../../../../store/transactionStore";
import { showSuccessToast } from "../../../../components/common/Toast";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

export default function PaymentSuccess() {
  const { paymentSuccess, isLoading } = useTransactionStore();
  const [countDown, setCountDown] = useState(10);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const order_id = new URLSearchParams(window.location.search).get("order_id");
  const transaction_status = new URLSearchParams(window.location.search).get(
    "transaction_status"
  );

  useEffect(() => {
    const fetchData = async () => {
      if (order_id && transaction_status) {
        const response = await paymentSuccess(order_id, transaction_status);
        if (response?.success) {
          showSuccessToast("Pembayaran Berhasil");
          setIsSuccess(true);
        }
      }
    };
    fetchData();
  }, [paymentSuccess]);

  useEffect(() => {
    if (!isSuccess) return;
    const interval = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countDown, isSuccess]);

  useEffect(() => {
    if (countDown === 0) {
      navigate("/purchases");
      localStorage.removeItem("selectedOrderId");
    }
  }, [countDown]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-background/25 min-h-screen flex justify-center items-center">
      <div className="mx-5 bg-white p-10 rounded-2xl flex flex-col justify-center items-center gap-3 max-w-3xl">
        <img
          src={isSuccess ? "/orderConfirmed.svg" : "/paymentFail.svg"}
          alt="Order Confirmed"
          className="md:w-1/2"
        />
        <h2 className="text-xl md:text-2xl font-semibold text-center my-5">
          {isSuccess ? "Pembayaran Berhasil 🎉" : "Pembayaran Gagal"}
        </h2>
        {isSuccess ? (
          <p className="text-center">
            Terima kasih! Pembayaran Anda telah berhasil diterima. <br />
            Pesanan Anda kini sudah diteruskan ke penjual dan akan segera
            diproses.
          </p>
        ) : (
          <p className="text-center">
            Mohon maaf, pembayaran Anda gagal. Silakan coba lagi atau hubungi
            admin.
          </p>
        )}
        <Link to="/purchases">
          <button
            onClick={() => localStorage.removeItem("selectedOrderId")}
            className="bg-primaryDark font-semibold md:bg-primary py-3 px-10 rounded-xl hover:bg-primaryDark transition-colors duration-300"
          >
            Lihat pesanan saya
          </button>
        </Link>

        {isSuccess && (
          <p className="text-center text-sm text-gray-500 mt-10">
            Halaman ini akan otomatis kembali ke halaman pesanan Anda dalam{" "}
            {countDown} detik
          </p>
        )}
      </div>
    </div>
  );
}
