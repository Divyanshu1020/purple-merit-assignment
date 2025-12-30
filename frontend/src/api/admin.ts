import { getAccessToken } from "@/store/authStore";
import environment from "../config";

export interface User {
  _id: string;
  id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetUsersResponse {
  message: string;
  status: string;
  data: {
    users: User[];
    pagination: PaginationData;
  };
}

export interface ToggleStatusResponse {
  message: string;
  status: string;
  data: {
    user: User;
  };
}

export const getUsers = async (params: {
  page?: number;
  limit?: number;
  status?: string;
  role?: string;
  search?: string;
}): Promise<GetUsersResponse> => {
  const token = getAccessToken();
  if (!token) throw new Error("No access token available");

  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.status) queryParams.append("status", params.status);
  if (params.role) queryParams.append("role", params.role);
  if (params.search) queryParams.append("search", params.search);

  // Note: Backend has this as a POST route for some reason, but it uses query params
  const res = await fetch(
    `${environment.API_URL}/admin/get-users?${queryParams.toString()}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch users");
  }

  const data = await res.json();
  if (data.data?.users) {
    data.data.users = data.data.users.map((u: any) => ({ ...u, id: u._id }));
  }
  return data;
};

export const toggleUserStatus = async (
  userId: string
): Promise<ToggleStatusResponse> => {
  const token = getAccessToken();
  if (!token) throw new Error("No access token available");

  const res = await fetch(
    `${environment.API_URL}/admin/toggle-user-status/${userId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to toggle user status");
  }

  const data = await res.json();
  if (data.data?.user) {
    data.data.user.id = data.data.user._id;
  }
  return data;
};
