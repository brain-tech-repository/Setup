// "use client"

// import { useQuery } from "@tanstack/react-query"
// import api from "@/lib/apiClient"
// import type { MenuItem } from "./icon-map"

// /**
//  * 🧩 Menu API (from MongoDB)
//  */
// const menuAPI = {
//   async getMenus() {
//     const res = await api.get("/menus")
//     return res.data
//   },
// }

// /**
//  * Fetch menus for sidebar
//  */
// export function useRoleMenus() {
//   return useQuery<MenuItem[]>({
//     queryKey: ["menus"],
//     queryFn: async () => {
//       const data = await menuAPI.getMenus()

//       // ✅ Transform backend response → sidebar format
//       return data.map((menu: any) => ({
//         label: menu.name,
//         icon: menu.icon || "LayoutDashboard",
//         children: menu.submenus?.map((sub: any) => ({
//           label: sub.name,
//           href: `/${sub.slug}`,
//           icon: sub.icon || "Circle",
//           permissions: {
//             view: true, // optional for now
//           },
//         })) || [],
//       }))
//     },
//   })
// }
