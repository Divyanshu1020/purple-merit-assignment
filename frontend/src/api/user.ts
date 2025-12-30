import { getAccessToken } from "@/store/authStore";
import environment from "../config";

export interface UpdateProfileRequest {
  fullName?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UserProfileResponse {
  message: string;
  status: string;
  data: {
    user: {
      _id: string;
      id?: string; // Add optional id
      fullName: string;
      email: string;
      role: "user" | "admin";
      createdAt: string;
      updatedAt: string;
    };
  };
}

export const getProfile = async (): Promise<UserProfileResponse> => {
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
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch profile");
  }

  const data = await res.json();
  if (data.data?.user) {
    data.data.user.id = data.data.user._id;
  }
  return data;
};

export const updateProfile = async (
  data: UpdateProfileRequest
): Promise<UserProfileResponse> => {
  const token = getAccessToken();

  if (!token) {
    throw new Error("No access token available");
  }

  const res = await fetch(`${environment.API_URL}/user/profile`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update profile");
  }

  const result = await res.json();
  if (result.data?.user) {
    result.data.user.id = result.data.user._id;
  }
  return result;
};

export const changePassword = async (
  data: ChangePasswordRequest
): Promise<{ message: string; status: string }> => {
  const token = getAccessToken();

  if (!token) {
    throw new Error("No access token available");
  }

  const res = await fetch(`${environment.API_URL}/user/change-password`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to change password");
  }

  return res.json();
};
