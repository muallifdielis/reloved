import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function EditPassword() {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (field, value) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <form className="container flex flex-col gap-4">
      <div className="flex flex-col gap-1 relative">
        <label htmlFor="old-password" className="text-sm font-medium">
          Kata sandi lama
        </label>
        <input
          type={showPassword.old ? "text" : "password"}
          name="old-password"
          id="old-password"
          placeholder="••••••••••••••••"
          value={passwords.oldPassword}
          onChange={(e) => handlePasswordChange("oldPassword", e.target.value)}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary block w-full p-2.5"
        />
        {showPassword.old ? (
          <IoEyeOffOutline
            className="absolute right-4 top-2/3 transform -translate-y-1/2 text-gray-500 cursor-pointer text-xl hover:text-secondary"
            onClick={() => togglePasswordVisibility("old")}
          />
        ) : (
          <IoEyeOutline
            className="absolute right-4 top-2/3 transform -translate-y-1/2 text-gray-500 cursor-pointer text-xl hover:text-secondary"
            onClick={() => togglePasswordVisibility("old")}
          />
        )}
      </div>

      <div className="flex flex-col gap-1 relative">
        <label htmlFor="new-password" className="text-sm font-medium">
          Kata sandi baru
        </label>
        <input
          type={showPassword.new ? "text" : "password"}
          name="new-password"
          id="new-password"
          placeholder="••••••••••••••••"
          value={passwords.newPassword}
          onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary block w-full p-2.5"
        />
        {showPassword.new ? (
          <IoEyeOffOutline
            className="absolute right-4 top-2/3 transform -translate-y-1/2 text-gray-500 cursor-pointer text-xl hover:text-secondary"
            onClick={() => togglePasswordVisibility("new")}
          />
        ) : (
          <IoEyeOutline
            className="absolute right-4 top-2/3 transform -translate-y-1/2 text-gray-500 cursor-pointer text-xl hover:text-secondary"
            onClick={() => togglePasswordVisibility("new")}
          />
        )}
      </div>

      <div className="flex flex-col gap-1 relative">
        <label htmlFor="confirm-password" className="text-sm font-medium">
          Konfirmasi kata sandi baru
        </label>
        <input
          type={showPassword.confirm ? "text" : "password"}
          name="confirm-password"
          id="confirm-password"
          placeholder="••••••••••••••••"
          value={passwords.confirmPassword}
          onChange={(e) =>
            handlePasswordChange("confirmPassword", e.target.value)
          }
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary block w-full p-2.5"
        />
        {showPassword.confirm ? (
          <IoEyeOffOutline
            className="absolute right-4 top-2/3 transform -translate-y-1/2 text-gray-500 cursor-pointer text-xl hover:text-secondary"
            onClick={() => togglePasswordVisibility("confirm")}
          />
        ) : (
          <IoEyeOutline
            className="absolute right-4 top-2/3 transform -translate-y-1/2 text-gray-500 cursor-pointer text-xl hover:text-secondary"
            onClick={() => togglePasswordVisibility("confirm")}
          />
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button className="bg-primary py-3 px-10 font-medium rounded-xl hover:bg-primaryDark transition-colors duration-300">
          Ubah kata sandi
        </button>
      </div>
    </form>
  );
}