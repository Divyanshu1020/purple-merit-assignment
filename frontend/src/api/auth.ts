import { getAccessToken } from "@/store/authStore";
import environment from "../config";

// Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      fullName: string;
      role: "user" | "admin";
    };
  };
}

// Login API
export const login = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  const res = await fetch(`${environment.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json();
};

// Register API
export const register = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const res = await fetch(`${environment.API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
};

// Refresh Token API
export const refreshToken = async () => {
  const res = await fetch(`${environment.API_URL}/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(errorData.message || "Unauthenticated") as any;
    error.status = res.status;
    throw error;
  }

  return res.json(); // { accessToken }
};

// Refresh Token API
export const getProfile = async () => {
  const token = getAccessToken();

  if (!token) {
    throw new Error("No access token available");
  }

  const res = await fetch(`${environment.API_URL}/user/profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthenticated");
  }

  return res.json();
};
// Logout API
export const logout = async (): Promise<void> => {
  const res = await fetch(`${environment.API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Logout failed");
  }
};
