import React, { useEffect, useState } from "react";
import formatDate from "../../utils/formatDate";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function DetailUser({ title, data, onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex md:items-center justify-center z-50 overflow-y-auto">
      <div
        className={`bg-white p-8 w-full h-max md:max-w-xl rounded-lg transform transition-all duration-300 m-5 ${
          show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-lg font-semibold text-center">{title}</h2>

        {/* Data User */}
        <div className="flow-root my-10">
          <div className="flex justify-center mb-5">
            <img
              src={data?.image ? data?.image : "/avatar.png"}
              alt={data?.name}
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Nama</dt>
              <dd className="text-gray-700 sm:col-span-2">{data?.name}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Username</dt>
              <dd className="text-gray-700 sm:col-span-2">{data?.username}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Email</dt>
              <dd className="text-gray-700 sm:col-span-2 flex items-center justify-between">
                {data?.email}{" "}
                {data?.isVerified && (
                  <IoIosCheckmarkCircle className="text-green-500 text-xl" />
                )}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Nomor Telepon</dt>
              <dd className="text-gray-700 sm:col-span-2">{data?.phone}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Alamat</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {data?.address ? data?.address : "-"}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Role</dt>
              <dd className="text-gray-700 sm:col-span-2 capitalize">
                {data?.role}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Tanggal Bergabung</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {formatDate(data?.createdAt)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg ml-2 transition-colors duration-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
