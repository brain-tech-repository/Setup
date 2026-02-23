"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { RoleResponseType, RoleType } from "../types";
import api from "@/lib/apiClient";

/* =======================
   API FUNCTIONS
======================= */

const roleAPI = {
  getRoles: async (): Promise<RoleResponseType[]> => {
    const res = await api.get("/role");
    return res.data;
  },

  getRoleById: async (id: string): Promise<RoleResponseType> => {
    const res = await api.get(`/role/${id}`);
    return res.data;
  },

  createRole: async (
    payload: RoleType
  ): Promise<RoleResponseType> => {
    const res = await api.post("/role", payload);
    return res.data;
  },

updateRolePermissions: async (
  id: string,
  payload: any
): Promise<RoleResponseType> => {
  const res = await api.put(`/role/${id}/permissions`, payload);
  return res.data;
},


  deleteRole: async (id: string) => {
    await api.delete(`/role/${id}`);
  },
};

/* =======================
   QUERY HOOKS
======================= */

export function useRoleList(): UseQueryResult<RoleResponseType[]> {
  return useQuery({
    queryKey: ["role"],
    queryFn: roleAPI.getRoles,
    retry: false,
  });
}

export function useRoleById(id?: string | null) {
  return useQuery({
    queryKey: ["role", id],
    queryFn: () => roleAPI.getRoleById(id as string),
    enabled: !!id,
    retry: false,
  });
}

/* =======================
   MUTATION HOOKS
======================= */

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roleAPI.createRole,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["role"] });
      toast.success("Role created successfully");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Create failed"
      );
    },
  });
}

export function useUpdateRolePermissions(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) =>
      roleAPI.updateRolePermissions(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["role"] });
      queryClient.invalidateQueries({ queryKey: ["role", id] });
      toast.success("Permissions updated successfully");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Permission update failed"
      );
    },
  });
}


export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roleAPI.deleteRole,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["role"] });
      toast.success("Role deleted successfully");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Delete failed"
      );
    },
  });
}
