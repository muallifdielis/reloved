import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="">
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <span className="block text-sm text-gray-500 text-center">
        © 2024{" "}
        <Link to="/admin/dashboard" className="hover:underline">
          ReLoved
        </Link>
        . All Rights Reserved.
      </span>
    </div>
  );
}
