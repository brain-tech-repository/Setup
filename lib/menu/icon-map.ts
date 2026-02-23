// types/menu.ts
import * as Icons from "lucide-react"

/* =========================
   PERMISSIONS
========================= */

export type Permission = {
  view: boolean
  list: boolean
  create: boolean
  update: boolean
  delete: boolean
  approve: boolean
}

/* =========================
   DEFAULT PERMISSIONS
========================= */

export const FULL_PERMISSION: Permission = {
  view: true,
  list: true,
  create: true,
  update: true,
  delete: true,
  approve: true,
}

export const READ_ONLY_PERMISSION: Permission = {
  view: true,
  list: true,
  create: false,
  update: false,
  delete: false,
  approve: false,
}

/* =========================
   MENU TYPE
========================= */

export type MenuItem = {
  label: string
  key?: string
  icon: string
   slug: string      
  href?: string
  permissions?: Permission
  children?: MenuItem[]
}

/* =========================
   ICON MAP + SAFE UTILITY
========================= */

export const iconMap = Icons as Record<string, any>

/**
 * Safe Icon Getter
 * - Handles undefined
 * - Handles lowercase
 * - Handles wrong icon names
 * - Always returns a valid icon
 */
export const getIcon = (name?: string) => {
  if (!name) return iconMap.LayoutDashboard

  const cleaned = name.trim()

  // Direct match
  if (iconMap[cleaned]) return iconMap[cleaned]

  // Try capitalizing first letter (users → Users)
  const capitalized =
    cleaned.charAt(0).toUpperCase() + cleaned.slice(1)

  if (iconMap[capitalized]) return iconMap[capitalized]

  // Fallback default
  return iconMap.LayoutDashboard
}
