import { useEffect, useState } from "react";

export default function Danger({ title, onClose, message, onSubmit }) {
  const [show, setShow] = useState(false);

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
        <iframe src="https://lottie.host/embed/43cf72cb-f4cc-4491-a218-05d127d73ce1/RhKDgbsfaS.json"></iframe>
        <h2 className="text-lg font-semibold mb-2 text-center">{title}</h2>
        <p className="text-center text-sm mb-10">{message}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onSubmit}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Ya
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg ml-2 transition-colors duration-300"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
}
