/* =======================
   PERMISSION TYPE
======================= */
export type PermissionType = {
  create: boolean
  view: boolean
  update: boolean
  delete: boolean
}

/* =======================
   SUB MENU TYPE
======================= */
export type SubMenuType = {
  _id: string
  label: string
  slug: string
  permissions: PermissionType
}

/* =======================
   PARENT MENU TYPE
======================= */
export type MenuType = {
  _id: string
  label: string
  slug: string
  submenus: SubMenuType[]
}

/* =======================
   ROLE TYPE (CREATE / UPDATE)
======================= */
export type RoleType = {
  role_code: string
  role_name: string

  // When saving permissions
  menuPermissions?: {
    menu: string
    permissions: PermissionType
  }[]
}

/* =======================
   ROLE RESPONSE TYPE
======================= */
export type RoleResponseType = {
  _id: string
  role_code: string
  role_name: string

  // 🔥 NEW STRUCTURE FROM BACKEND
  menus: MenuType[]

  createdAt: string
  updatedAt: string
}

/* =======================
   FORM VALUES
======================= */
export type RoleFormValues = {
  role_code: string
  role_name: string
}