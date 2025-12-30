interface User {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "admin";
}

let accessToken: string | null = null;
let userData: User | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
  accessToken = null;
  userData = null;
};

export const setUserData = (user: User) => {
  userData = user;
};

export const getUserData = () => userData;

export const isAdmin = () => userData?.role === "admin";
