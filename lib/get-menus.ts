"use client"

import { useQuery } from "@tanstack/react-query"
import api from "@/lib/apiClient"
import type { MenuItem } from "./icon-map"

/**
 * 🧩 Role Menu API
 */
const menuAPI = {
	/**
	 * Get menus by role ID
	 */
	async getMenus(roleId: number) {
		const res = await api.get(`/roles/${roleId}/menus`)
		return res.data
	},
}

/**
 * Fetch role menus (for sidebar & permissions)
 */
export function useRoleMenus(roleId?: number) {
	return useQuery<MenuItem[]>({
		queryKey: ["role-menus", roleId],
		queryFn: async () => {
			const data = await menuAPI.getMenus(Number(roleId))

			// ✅ exact path from your API response
			return data?.menus?.original?.menus ?? []
		},
		enabled: !!roleId,
		retry: false,
	})
}
