export const refreshToken = async () => {
  const res = await fetch("/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Unauthenticated");
  }

  return res.json(); // { accessToken }
};
