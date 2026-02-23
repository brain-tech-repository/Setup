"use client"

import { useQuery } from "@tanstack/react-query"
import api from "@/lib/apiClient"
import type { MenuItem } from "./icon-map"

/**
 * 🧩 Sidebar Menu API (Filtered by Role)
 */
const menuAPI = {
  async getSidebarMenus(roleId: string) {
    const res = await api.get(`/menus/sidebar`)
    return res.data
  },
}

/**
 * Fetch Sidebar Menus (Role Based)
 */
export function useSidebarMenus() {
  return useQuery<MenuItem[]>({
    queryKey: ["sidebar-menus"],
    queryFn: async () => {
      const res = await api.get("/menus/sidebar")
      return res.data.map((menu: any) => ({
        label: menu.label,
        slug: menu.slug,
        icon: menu.icon || "LayoutDashboard",
        children:
          menu.submenus?.map((sub: any) => ({
            label: sub.label,
            slug: sub.slug,
            href: `/${menu.slug}/${sub.slug}`,
            icon: sub.icon || "Circle",
          })) || [],
      }))
    }
  })
}