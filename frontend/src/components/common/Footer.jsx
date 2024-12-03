import React from "react";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-backgroundFooter p-4">
      <div className="container flex flex-col md:flex-row md:items-center justify-between gap-3">
        <Link to="/">
          <h1 className="font-title text-2xl md:text-3xl text-white">
            R<span className="text-secondary">e</span>Loved
            <span className="text-secondary">.</span>
          </h1>
        </Link>

        <div className="flex flex-col md:flex-row gap-3 md:gap-8 text-white">
          <div>
            <h4 className="mb-2 md:text-center cursor-default">Lainnya</h4>
            <Link to="/about-us">
              <p className="text-sm hover:underline hover:text-secondary w-max">
                Tentang Kami
              </p>
            </Link>
          </div>
          <div>
            <h4 className="mb-2 md:text-center cursor-default">Kontak Kami</h4>
            <p
              className="text-sm hover:underline hover:text-secondary flex items-center gap-1 cursor-pointer w-max"
              onClick={() => window.open("mailto:reloved@gmail.com")}
            >
              <IoMail className="text-lg" /> reloved@gmail.com
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-3 mb-3 mt-8 w-9/12 border-t border-white mx-auto">
        <p className="text-sm text-white font-extralight">
          &copy; 2024{" "}
          <Link to="/" className="hover:underline hover:text-secondary">
            ReLoved.
          </Link>{" "}
          All rights reserved.
        </p>
      </div>
    </div>
  );
}
