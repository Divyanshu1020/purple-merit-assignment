import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { login, type LoginRequest } from "../api/auth";
import { setAccessToken, setUserData } from "../store/authStore";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => login(credentials),
    onSuccess: (data) => {
      // Save access token and user data to auth store
      setAccessToken(data.data.accessToken);
      setUserData(data.data.user);

      // Show success message
      toast.success(data.message || "Login successful!");

      // Navigate to home page
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed. Please try again.");
    },
  });
};
