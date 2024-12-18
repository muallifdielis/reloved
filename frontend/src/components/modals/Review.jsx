import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { useReviewStore } from "../../store/reviewStore";
import { showErrorToast, showSuccessToast } from "../common/Toast";
import { useNavigate } from "react-router-dom";

export default function Review({ product, onClose }) {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const { createReview, isLoading } = useReviewStore();
  const navigate = useNavigate();

  useEffect(() => {
    setShow(true);
  }, []);

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      const data = {
        product: product?.order_items[0]?.product?._id,
        user: product?.user?._id,
        rating: rating,
        comment: comment,
      };
      const response = await createReview(data);
      if (response.success) {
        showSuccessToast("Review berhasil dikirim");
        navigate(`/detail-product/${product?.order_items[0]?.product?._id}`);
      } else {
        showErrorToast(
          response?.data?.message || "Terjadi kesalahan saat mengirim ulasan"
        );
        onClose();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className={`bg-white p-8 rounded-lg transform transition-all duration-300 mx-5 ${
          show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          Bagikan penilaianmu untuk produk ini!
        </h2>

        {/* PRODUK */}
        <div className="flex gap-4 mb-4">
          <img
            src={product?.order_items[0]?.product?.images[0]}
            alt={product?.order_items[0]?.product?.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex flex-col gap-1">
            <h5 className="font-medium">
              {product?.order_items[0]?.product?.name}
            </h5>
            <p className="text-sm text-gray-400">
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(product?.total_price)}
            </p>
          </div>
        </div>

        <form onSubmit={handleReview}>
          {/* RATING */}
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  name="rating"
                  value={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(null)}
                  className="bg-transparent border-none cursor-pointer"
                >
                  <IoStar
                    size={24}
                    color={star <= (hover || rating) ? "#FFD700" : "#D3D3D3"} // Warna emas untuk rating dan hover
                  />
                </button>
              ))}
            </div>
          </div>

          {/* REVIEW */}
          <div className="mb-4">
            <label
              htmlFor="review"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Ulasan
            </label>
            <textarea
              id="review"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tulis ulasanmu disini..."
              required
              className="block p-2.5 w-full text-sm resize-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-secondary focus:border-secondary focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-gray-300 hover:bg-gray-400 transition-colors duration-300 text-gray-600 hover:text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onClose}
              type="button"
              disabled={isLoading}
            >
              Batal
            </button>
            <button
              className="bg-secondary hover:bg-secondaryHover transition-colors duration-300 text-white px-4 py-2 rounded-lg ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Mengirim..." : "Kirim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
