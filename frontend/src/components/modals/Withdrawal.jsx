import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../common/Toast";

export default function WithdrawModal({ onClose }) {
  const [show, setShow] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setShow(true);
  }, []);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (withdrawAmount < 10000) {
      showErrorToast("Jumlah penarikan minimum adalah Rp 10.000");
      return;
    }
    try {
      // Simulasi API call untuk penarikan saldo
      const response = { success: true }; // Ganti dengan real API call jika tersedia
      if (response.success) {
        showSuccessToast("Penarikan berhasil!");
        onClose();
        navigate("/seller-dashboard");
      } else {
        showErrorToast("Terjadi kesalahan saat melakukan penarikan");
      }
    } catch (error) {
      console.error(error);
      showErrorToast("Terjadi kesalahan");
    }
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
              value="BCA"
              disabled
              className="w-full p-2 border rounded-lg border-orange-500 text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nomor Rekening</label>
            <input
              type="text"
              value="8239128371283"
              disabled
              className="w-full p-2 border rounded-lg border-orange-500 text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Total Pendapatan</label>
            <input
              type="text"
              value="Rp 700.000"
              disabled
              className="w-full p-2 border rounded-lg border-orange-500 text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Total Penarikan</label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(Number(e.target.value))}
              placeholder="Rp 0"
              required
              className="w-full p-2 border rounded-lg border-orange-500 text-gray-900"
            />
          </div>

          <p className="text-sm text-gray-500 mb-4">*min. Rp 10.000</p>
          <p className="text-sm text-gray-500 mb-4">
            *Untuk mengubah informasi bank dapat dilakukan pada
            <span className="text-orange-500 font-semibold cursor-pointer ml-1">
              pengaturan
            </span>
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 transition duration-300 text-gray-600 px-4 py-2 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 transition duration-300 text-white px-4 py-2 rounded-lg"
            >
              Tarik
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
