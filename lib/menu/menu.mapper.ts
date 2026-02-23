import type { MenuItem } from "./icon-map"
import { LOCAL_MENUS } from "./menu.config"



export function buildSidebarMenus(apiMenus: any[]): MenuItem[] {
  if (!apiMenus?.length) return []

  return LOCAL_MENUS.map((parent: any) => {
    const filteredChildren = parent.children
      ?.map((child : any) => {
        const match = apiMenus.find(
          (api) => api.slug === child.slug
        )

        if (!match || !match.permissions?.view) return null

        return {
          ...child,
          permissions: match.permissions,
        }
      })
      .filter(Boolean) as MenuItem[]

    if (!filteredChildren?.length) return null

    return {
      ...parent,
      children: filteredChildren,
    }
  }).filter(Boolean) as MenuItem[]
}
