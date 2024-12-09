import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useEffect, useState } from "react";
import { showErrorToast } from "../components/common/Toast";

export default function ProtectedAdmin() {
  const { currentUser, getCurrentUser, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getCurrentUser();
      } finally {
        setIsChecking(false);
      }
    };

    fetchUser();
  }, [getCurrentUser]);

  useEffect(() => {
    // Navigasi hanya dilakukan jika cek selesai dan user tidak valid
    if (!isChecking && !isLoading) {
      if (!currentUser) {
        showErrorToast("Anda harus login terlebih dahulu");
        navigate("/login");
      } else if (currentUser.role !== "admin") {
        showErrorToast("Anda tidak memiliki akses ke halaman ini");
        navigate("/");
      }
    }
  }, [isChecking, isLoading, currentUser, navigate]);

  return null;
}
