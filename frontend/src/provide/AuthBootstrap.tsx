import { type AuthResponse, getProfile, refreshToken } from "@/api/auth";
import { setAccessToken, setUserData } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { LoadingScreen } from "@/components/common/LoadingScreen";

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isPublicRoute = ["/login", "/signup"].includes(location.pathname);

  const refreshQuery = useQuery({
    queryKey: ["auth", "refresh"],
    queryFn: refreshToken,
    retry: false,
    cacheTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data: AuthResponse) => {
      setAccessToken(data.data.accessToken);
    },
    onError: (err: any) => {
      // Redirect to login only if we are not already on a public route
      if (err.status === 401 && !isPublicRoute) {
        navigate("/login", { replace: true });
      }
    },
  });

  const profileQuery = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getProfile,
    enabled: refreshQuery.isSuccess,
    retry: false,
    onSuccess: (data: AuthResponse) => {
      setUserData(data.data.user);
    },
  });

  // Only show loading screen while we verify the initial session
  const isLoading =
    refreshQuery.isLoading ||
    (refreshQuery.isSuccess && profileQuery.isLoading);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}

export default AuthBootstrap;
