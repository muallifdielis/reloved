import { IoStar } from "react-icons/io5";
import formatDate from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import useAuthStore from "../../store/authStore";
import { useReviewStore } from "../../store/reviewStore";
import { showSuccessToast } from "./Toast";
import Danger from "../modals/Danger";
import { useState } from "react";

export default function ReviewsCard({ data }) {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const { deleteReview } = useReviewStore();
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteReview(data?._id);
      if (response.success) {
        showSuccessToast("Ulasan berhasil dihapus");
        setShowModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-secondary rounded-xl p-4 min-w-96 w-full min-h-48">
      <div className="flex flex-row justify-between gap-3">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate(`/profile/${data?.user?._id}`)}
        >
          <img
            src={data?.user?.image ? data?.user?.image : "/avatar.png"}
            alt={data?.user?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{data?.user?.name}</p>
            <p className="text-sm text-gray-400">@{data?.user?.username}</p>
          </div>
        </div>
        <div className="flex items-center h-max gap-1">
          <p className="text-sm text-gray-400">{formatDate(data?.createdAt)}</p>
          {data?.user?._id === currentUser?._id && (
            <button onClick={handleModal}>
              <GoTrash className="text-lg text-gray-400 hover:text-red-600" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-2">
        {Array.from({ length: data?.rating }).map((_, i) => (
          <IoStar key={i} className="w-5 h-5 text-yellow-400" />
        ))}
      </div>

      <p className="text-sm">{data?.comment}</p>

      {showModal && (
        <Danger
          title="Hapus Ulasan"
          message="Anda yakin ingin menghapus ulasan ini?"
          onSubmit={handleDelete}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
