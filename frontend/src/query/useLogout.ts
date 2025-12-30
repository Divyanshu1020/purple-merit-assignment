import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logout } from "../api/auth";
import { clearAccessToken } from "../store/authStore";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear auth store
      clearAccessToken();

      // Clear all queries
      queryClient.clear();

      // Show success message
      toast.success("Logged out successfully");

      // Navigate to login page
      navigate("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Logout failed");
      // Even if the API fails, we should probably clear the local store
      clearAccessToken();
      queryClient.clear();
      navigate("/login");
    },
  });
};
