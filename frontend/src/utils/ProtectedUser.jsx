import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { showErrorToast } from "../components/common/Toast";
import { useEffect, useState } from "react";

export default function ProtectedUser({ children }) {
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
    if (!isChecking && !isLoading) {
      if (!currentUser) {
        showErrorToast("Anda harus login terlebih dahulu");
        navigate("/login");
      } else if (currentUser.role !== "user") {
        showErrorToast("Anda tidak memiliki akses ke halaman ini");
        navigate("/admin/dashboard");
      }
    }
  }, [isChecking, isLoading, currentUser, navigate]);

  return children;
}
