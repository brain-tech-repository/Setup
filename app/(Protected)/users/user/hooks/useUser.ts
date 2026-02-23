"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/apiClient";
import { UserResponse, UserType } from "../types";

/* =======================
   API FUNCTIONS
======================= */

const userAPI = {
  getUsers: async (): Promise<UserResponse[]> => {
    const res = await api.get("/users");
    return res.data;
  },

  getUserById: async (id: string): Promise<UserResponse> => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },

  createUser: async (payload: UserType): Promise<UserResponse> => {
    const res = await api.post("/users", payload);
    return res.data;
  },

  updateUser: async (
    id: string,
    payload: Partial<UserType>
  ): Promise<UserResponse> => {
    const res = await api.put(`/users/${id}`, payload);
    return res.data;
  },

  deleteUser: async (id: string) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  },
};

/* =======================
   QUERY HOOKS
======================= */

export function useUsersList(): UseQueryResult<UserResponse[]> {
  return useQuery({
    queryKey: ["users"],
    queryFn: userAPI.getUsers,
    retry: false,
  });
}

export function useUserById(userId?: string | null) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => userAPI.getUserById(userId as string),
    enabled: !!userId,
    retry: false,
  });
}

/* =======================
   MUTATION HOOKS
======================= */

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UserType) =>
      userAPI.createUser(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Create failed"
      );
    },
  });
}

export function useUpdateUser(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<UserType>) =>
      userAPI.updateUser(userId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({
        queryKey: ["users", userId],
      });
      toast.success("User updated successfully");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Update failed"
      );
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      userAPI.deleteUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Delete failed"
      );
    },
  });
}
