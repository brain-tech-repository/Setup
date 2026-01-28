"use client";

import {
	type UseQueryResult,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/apiClient";
import type { UserResponseById, UsersResponse, UserType } from "../types";

/**
 * 🧩 User API Service (using /register endpoints)
 */
const userAPI = {
	/**
	 * Generate user code
	 */
	async generateUserCode() {
		const res = await api.get("/users/generate-code");
		return res.data;
	},

	/**
	 * Get all registered users
	 */
	async getUsers(page = 1, perPage = 10) {
		const res = await api.get(`/users?page=${page}&per_page=${perPage}`);
		return res.data;
	},

	/**
	 * Get user by ID
	 */
	async getUserById(id: number) {
		const res = await api.get(`/users/${id}`);
		return res.data;
	},

	/**
	 * Register new user
	 */
	async registerUser(payload: UserType) {
		const res = await api.post("/register", payload);
		return res.data;
	},

	/**
	 * Update user
	 */
	async updateUser(id: number, payload: UserType) {
		const res = await api.put(`/users/${id}`, payload);
		return res.data;
	},

	/**
	 * Delete one or multiple users
	 */
	async deleteUsers(ids: number[]) {
		const res = await api.delete(`/users/${ids}`);
		return res.data;
	},

	/**
	 * Bulk update user status
	 */
	async bulkUpdateStatus(ids: number[], status: "Active" | "Inactive") {
		const res = await api.post("/users/bulk-status", { ids, status });
		return res.data;
	},
};

// ==================== LIST OPERATIONS ====================

/**
 * Fetch all users
 */
export function useUsersList(page = 1, perPage = 10) {
	return useQuery<UsersResponse>({
		queryKey: ["users", page, perPage],
		queryFn: () => userAPI.getUsers(page, perPage),
		retry: false,
	});
}

/**
 * Delete user(s)
 */
export function useDeleteUsers() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (ids: number[]) => userAPI.deleteUsers(ids),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast.success("User(s) deleted successfully!");
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.message || "Failed to delete user(s)";
			toast.error(message);
		},
	});
}

/**
 * Bulk update user status
 */
export function useBulkUpdateUserStatus() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: { ids: number[]; status: "Active" | "Inactive" }) =>
			userAPI.bulkUpdateStatus(payload.ids, payload.status),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast.success("Status updated successfully!");
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.message || "Failed to update status";
			toast.error(message);
		},
	});
}

// ==================== FORM OPERATIONS ====================

/**
 * Fetch single user by ID (for edit mode)
 */
export function useUserById(userId?: number | null) {
	const isEditMode = !!userId && userId !== 0 && userId !== -1;

	return useQuery<UserResponseById>({
		queryKey: ["users", userId],
		queryFn: () => userAPI.getUserById(Number(userId)),
		enabled: isEditMode,
		retry: false,
	});
}

/**
 * Register (create) new user
 */
export function useRegisterUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: UserType) => userAPI.registerUser(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast.success("User registered successfully!");
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.message || "Failed to register user";
			toast.error(message);
		},
	});
}

/**
 * Update user
 */
export function useUpdateUser(userId?: number | null) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: UserType) =>
			userAPI.updateUser(Number(userId), payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast.success("User updated successfully!");
		},
		onError: (error: any) => {
			const message = error?.response?.data?.message || "Failed to update user";
			toast.error(message);
		},
	});
}

/**
 * Generate user code (manual trigger)
 */
export function useGenerateUserCode(): UseQueryResult<any> {
	return useQuery({
		queryKey: ["register-generate-code"],
		queryFn: async () => {
			try {
				const data = await userAPI.generateUserCode();
				// toast.success("User code generated successfully!");
				return data;
			} catch (error: any) {
				const message =
					error?.response?.data?.message || "Failed to generate user code.";
				toast.error(message);
				throw error;
			}
		},
		enabled: false, // Run only when triggered manually
		retry: false,
	});
}
