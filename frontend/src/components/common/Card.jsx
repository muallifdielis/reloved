import { useNavigate } from "react-router-dom";

export default function Card() {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-lg hover:shadow-2xl rounded-lg p-4 w-80 hover:scale-105 transition duration-300 ease-in-out">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <img
            src="https://picsum.photos/800"
            alt="Product Image"
            className="w-full h-64 object-cover rounded-lg cursor-pointer"
            onClick={() => navigate("/detail-product")}
          />
          <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full z-10">
            <svg
              fill="#a8a8a8"
              className="w-5 h-5 hover:fill-[#ff2525] transition-colors duration-300 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-2">
            <h2
              className="text-lg font-semibold truncate cursor-pointer"
              onClick={() => navigate("/detail-product")}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nobis
              ab illum. Corporis libero consequatur doloribus. Suscipit sapiente
              voluptatibus animi.
            </h2>
            <p
              className="text-sm text-nowrap cursor-pointer"
              onClick={() => navigate("/detail-product")}
            >
              Rp <span className="font-bold text-base">435.000</span>
            </p>
          </div>
          <p
            className="text-gray-600 text-sm h-30 truncate cursor-pointer"
            onClick={() => navigate("/detail-product")}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            tempora voluptates ipsum vel tenetur laborum voluptatem amet
            excepturi, est nisi dolor, modi dignissimos suscipit, nobis
            pariatur. Officiis assumenda vel unde.
          </p>
          <button className="bg-transparent border border-accent text-accent py-2 px-4 rounded-full w-max hover:bg-primary hover:border-primary transition-colors duration-300">
            Masukkan Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
