import React from "react";
import { Link } from "react-router-dom";

export default function BannerSection() {
  return (
    <div className="w-full h-80 ">
      <div
        style={{
          backgroundImage: "url(/banner.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-full"
      >
        <div className="flex justify-end items-center h-full">
          <div className="md:bg-white py-10 px-12 rounded-s-3xl flex flex-col gap-5 justify-center items-center">
            <h2 className="text-white md:text-black font-bold text-3xl text-center leading-relaxed">
              Belanja sekarang dan <br /> nikmati gratis ongkirnya!
            </h2>
            <Link to="/products">
              <button className="bg-primaryDark md:bg-primary py-3 px-6 text-xl rounded-xl font-bold hover:bg-primaryDark transition-colors duration-300">
                Belanja sekarang
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
