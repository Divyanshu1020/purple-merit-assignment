import { getUsers, toggleUserStatus } from "@/api/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetUsers = (params: {
  page?: number;
  limit?: number;
  status?: string;
  role?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    keepPreviousData: true,
  });
};

export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleUserStatus,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
