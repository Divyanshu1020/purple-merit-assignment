import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { register, type RegisterRequest } from "../api/auth";
import { setAccessToken, setUserData } from "../store/authStore";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: (data) => {
      // Save access token and user data to auth store
      setAccessToken(data.data.accessToken);
      setUserData(data.data.user);

      // Show success message
      toast.success(data.message || "Registration successful!");

      // Navigate to home page
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Registration failed. Please try again.");
    },
  });
};
