import React, { useEffect, useRef, useState } from "react";
import useAuthStore from "../../../../store/authStore";
import { useUserStore } from "../../../../store/userStore";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import { showSuccessToast } from "../../../../components/common/Toast";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const { currentUser, isLoading } = useAuthStore();
  const { updateProfile, isLoading: updateLoading } = useUserStore();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    phone: "",
    address: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser?.name,
        bio: currentUser?.bio,
        phone: currentUser?.phone,
        address: currentUser?.address,
        image: currentUser?.image,
      });
    }
  }, [currentUser]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log("file", file);
    setImagePreview(URL.createObjectURL(file));
    setFormData({ ...formData, image: file });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name") {
      const filteredValue = value.replace(/[^A-Za-z\s]/g, "").slice(0, 50);
      setFormData((prev) => ({
        ...prev,
        [name]: filteredValue,
      }));
      if (filteredValue.trim() === "") {
        setErrorMessage("Nama harus diisi.");
      } else {
        setErrorMessage("");
      }
      if (filteredValue.length < 3) {
        setErrorMessage("Nama harus memiliki minimal 3 karakter.");
      }
    }

    if (name === "phone") {
      const formattedPhoneNumber = value.replace(/\D/g, "").slice(0, 16);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedPhoneNumber,
      }));

      if (formattedPhoneNumber.trim() === "") {
        setErrorMessage("Nomor telepon harus diisi.");
      } else {
        setErrorMessage("");
      }
      if (formattedPhoneNumber.length < 9) {
        setErrorMessage("Nomor telepon harus memiliki minimal 9 digit.");
      }
    }
  };

  const handleDeleteImage = () => {
    setFormData({ ...formData, image: "" });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMessage) {
      return;
    }

    if (formData.name.length < 3 || formData?.name.trim() === "") {
      setErrorMessage("Nama harus memiliki minimal 3 karakter.");
      return;
    }
    if (formData.phone.length < 9 || formData?.phone.trim() === "") {
      setErrorMessage("Nomor telepon harus memiliki minimal 9 digit.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("bio", formData.bio);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("image", formData.image || "");

    const response = await updateProfile(currentUser?._id, data);
    if (response.success) {
      showSuccessToast("Profil berhasil diperbarui.");
      navigate(`/profile/${currentUser?._id}`);
    } else {
      setErrorMessage(response.message);
    }
  };

  console.log("currentUser", currentUser);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full">
          <LoadingSpinner />
        </div>
      ) : (
        <form className="container flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
            <img
              src={
                imagePreview
                  ? imagePreview
                  : formData?.image
                  ? `${formData?.image}`
                  : "/avatar.png"
              }
              alt="Profile Picture"
              className="w-36 h-36 rounded-full object-cover"
            />

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <button
                  onClick={handleButtonClick}
                  type="button"
                  className="bg-accent hover:bg-accentHover text-white transition-colors duration-300 px-5 py-2.5 rounded-xl"
                >
                  Ubah foto
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  name="image"
                  id="image"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              <button
                onClick={handleDeleteImage}
                className="bg-transparent border border-accent hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors duration-300 px-5 py-2 rounded-xl"
                type="button"
              >
                Hapus foto
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-medium">
                Nama
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData?.name}
                onChange={handleFormChange}
                placeholder="Masukkan nama Anda"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary block w-full p-2.5"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="bio" className="text-sm font-medium">
                Bio
              </label>
              <input
                type="text"
                name="bio"
                id="bio"
                value={formData?.bio}
                onChange={handleFormChange}
                placeholder="Masukkan bio singkat Anda"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary block w-full p-2.5"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-sm font-medium">
                Nomor Telepon
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={formData?.phone}
                onChange={handleFormChange}
                placeholder="Masukkan nomor telepon Anda"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary block w-full p-2.5"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="address" className="text-sm font-medium">
                Alamat
              </label>
              <textarea
                name="address"
                id="address"
                value={formData?.address}
                onChange={handleFormChange}
                placeholder="Masukkan alamat Anda"
                rows="4"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary block w-full p-2.5"
              />
            </div>

            <p className="text-red-500 text-sm">{errorMessage}</p>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={
                  updateLoading ||
                  formData?.name?.trim() === "" ||
                  formData?.phone?.trim() === ""
                }
                className="bg-primary py-3 px-10 font-medium rounded-xl hover:bg-primaryDark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateLoading ? "Memperbarui..." : "Perbarui Profil"}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
