import type { MenuItem } from "@/lib/menu/icon-map"

const FULL_PERMISSION = {
  view: true,
  list: true,
  create: true,
  update: true,
  delete: true,
  approve: true,
}

export const DEFAULT_MENUS: MenuItem[] = [
  {
    label: "User Management",
    slug: "user-management",      // 👈 Parent slug
    icon: "Users",
    children: [
      {
        label: "Users",
        slug: "users",            // 👈 Match backend slug
        href: "/user-management/users",
        icon: "User",
        permissions: FULL_PERMISSION,
      },
      {
        label: "Permissions",
        slug: "permissions",
        href: "/user-management/permission",
        icon: "ShieldCheck",
        permissions: FULL_PERMISSION,
      },
    ],
  },

  {
    label: "Master Data Setup",
    slug: "master-data",
    icon: "Database",
    children: [
      {
        label: "Countries",
        slug: "countries",
        href: "/master-data/countries",
        icon: "Globe",
        permissions: FULL_PERMISSION,
      },
      {
        label: "Cities",
        slug: "cities",
        href: "/master-data/cities",
        icon: "MapPin",
        permissions: FULL_PERMISSION,
      },
    ],
  },
]
