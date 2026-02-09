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
   TYPES (match mongoose)
======================= */

/* =======================
   API FUNCTIONS
======================= */

const roleAPI = {

    getRole: async (): Promise<RoleResponseType[]> => {
        const res = await api.get("/role")
        return res.data
    },


    createRole: async (payload: RoleType): Promise<RoleResponseType> => {
        const res = await api.post("/role", payload);
        return res.data;
    },
    getRoleById: async (id: string): Promise<RoleResponseType> => {
        const res = await api.get(`/role/${id}`);
        return res.data;
    },


    updaterole: async (id: string, payload: Partial<RoleType>): Promise<RoleResponseType[]> => {
        const res = await api.put(`/role/${id}`, payload)
        return res.data
    },
     deleteRole: async (id: string): Promise<void> => {
        await api.delete(`/role/${id}`);
    },

}

export function useRolelist(): UseQueryResult<RoleResponseType[]> {
    return useQuery({
        queryKey: ["role"],
        queryFn: roleAPI.getRole,
        retry: false,
    })
}
export function useCreateRole() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: RoleType) => roleAPI.createRole(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["role"] });
            toast.success("User created successfully");
        },

        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Create failed");
        },
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


export function useUpdateRole(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: Partial<RoleType>) =>
            roleAPI.updaterole(id, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["role"] });
            queryClient.invalidateQueries({ queryKey: ["role", id] });
            toast.success("User updated successfully");
        },

        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Update failed");
        },
    })
}


export function useDeleteRole() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => roleAPI.deleteRole(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["role"] });
            toast.success("Role deleted successfully");
        },

        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Delete failed");
        },
    });
}







