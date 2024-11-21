import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";

export default function Review({ onSubmit, onClose }) {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setShow(true);
  }, []);

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
            src="https://picsum.photos/100"
            alt="Product"
            className="w-16 h-16 rounded-lg"
          />
          <div className="flex flex-col gap-1">
            <h5 className="font-medium">Lorem ipsum dolor sit amet</h5>
            <p className="text-sm text-gray-400">Rp 435.000</p>
          </div>
        </div>

        <form action="">
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
                  onClick={() => setRating(star)} // Menentukan rating berdasarkan bintang yang diklik
                  onMouseEnter={() => setHover(star)} // Menampilkan hover efek
                  onMouseLeave={() => setHover(null)} // Menghilangkan hover efek
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
              placeholder="Tulis ulasanmu disini..."
              required
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-gray-300 hover:bg-gray-400 transition-colors duration-300 text-gray-600 hover:text-white px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              className="bg-secondary hover:bg-secondaryHover transition-colors duration-300 text-white px-4 py-2 rounded-lg ml-2"
              onClick={onClose}
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
