import { refreshToken } from "@/api/auth";
import Login from "@/components/page/login/Login";
import { setAccessToken } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const { isLoading, isError } = useQuery({
    queryKey: ["auth", "refresh"],
    queryFn: refreshToken,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
    },
  });

  if (isLoading) return null; // or splash screen
  if (isError) return <Login />;

  return <>{children}</>;
}

export default AuthBootstrap;