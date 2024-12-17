import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../common/Toast";
import { useSellerStore } from "../../store/sellerStore";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";
export default function WithdrawModal({ onClose }) {
  const [show, setShow] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();

  const {
    userBank,
    earnings,
    createWithdrawal,
    getUserEarnings,
    isLoading,
    getWithdrawalsHistory,
  } = useSellerStore();

  useEffect(() => {
    setShow(true);
  }, []);

  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (withdrawAmount < 10000) {
      showErrorToast("Jumlah penarikan minimum adalah Rp 10.000");
      return;
    }
    if (withdrawAmount > earnings?.availableEarnings) {
      showErrorToast("Jumlah penarikan tidak boleh melebihi total pendapatan");
      return;
    }

    const sellerId = currentUser?._id;
    const userBankId = userBank && userBank[0] ? userBank[0]._id : null;

    if (!userBankId) {
      showErrorToast("Nomor rekening tidak ditemukan.");
      return;
    }

    try {
      const response = await createWithdrawal(
        sellerId,
        userBankId,
        withdrawAmount
      );

      if (response.success) {
        await getUserEarnings(sellerId);
        await getWithdrawalsHistory();
        onClose();
      } else {
        showErrorToast("Terjadi kesalahan saat melakukan penarikan");
      }
    } catch (error) {
      console.error(error);
      showErrorToast("Terjadi kesalahan");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (/^\d+$/.test(value) || value === "") {
      setWithdrawAmount(value);
    }
  };

  const formatPrice = (price) => {
    const priceString = price ? price.toString() : "";
    return priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className={`bg-white p-5 rounded-lg transform transition-all duration-300 mx-5 w-80 sm:w-96 mt-10 max-h-[80vh] overflow-y-auto ${
          show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4 text-center">Tarik Saldo</h2>

        <form onSubmit={handleWithdraw}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nama Bank</label>
            <input
              type="text"
              value={userBank[0]?.namebank ? userBank[0]?.namebank : "-"}
              disabled
              className="w-full p-2 border rounded-lg border-orange-500 text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Nomor Rekening
            </label>
            <input
              type="text"
              value={userBank[0]?.norek ? userBank[0]?.norek : "-"}
              disabled
              className="w-full p-2 border rounded-lg border-secondary text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Total Pendapatan
            </label>
            <input
              type="text"
              value={new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(earnings?.availableEarnings)}
              disabled
              className="w-full p-2 border rounded-lg border-secondary text-gray-900"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-2">
              Total Penarikan
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                Rp
              </span>
              <input
                type="text"
                value={formatPrice(withdrawAmount) || ""}
                onChange={handleInputChange}
                placeholder="Masukkan jumlah"
                required
                className="w-full pl-10 p-2 border rounded-lg border-secondary text-gray-900 focus:outline-none"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">*min. Rp 10.000</p>
          <p className="text-sm text-gray-500 mb-4">
            *Untuk mengubah informasi bank dapat dilakukan pada
            <span className="text-secondary font-semibold cursor-pointer ml-1">
              <Link to="/seller/setting">pengaturan</Link>
            </span>
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="bg-gray-300 hover:bg-gray-400 transition duration-300 text-gray-600 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-secondary hover:bg-secondaryHover transition duration-300 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Menarik..." : "Tarik Saldo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
