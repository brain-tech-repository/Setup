// lib/menu/menu.types.ts

export type PermissionType = {
  view?: boolean
  list?: boolean
  create?: boolean
  update?: boolean
  delete?: boolean
  approve?: boolean
}

export type MenuItem = {
  label: string
  slug: string
  icon: string
  href?: string
  permissions?: PermissionType
  children?: MenuItem[]
}
