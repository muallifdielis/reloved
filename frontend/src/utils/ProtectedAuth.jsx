import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../components/common/Toast";

export default function ProtectedAuth({ children }) {
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
      if (currentUser) {
        navigate("/");
      }
    }
  }, [currentUser, isChecking, isLoading, navigate]);

  return children;
}
