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
  href?: string

  /** 
   * Permissions are required ONLY for leaf nodes (routes).
   * Parent menus can omit this.
   */
  permissions?: Permission

  children?: MenuItem[]
}

/* =========================
   ICON MAP
========================= */

/**
 * Usage:
 * const Icon = iconMap[item.icon] ?? iconMap.Circle
 */
export const iconMap = Icons as Record<string, any>
