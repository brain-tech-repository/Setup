// lib/menu/menu.config.ts

import type { MenuItem } from "./menu.types"

export const LOCAL_MENUS: MenuItem[] = [
  {
    label: "Users",
    slug: "users",
    icon: "Users",
    children: [
      {
        label: "Users",
        slug: "users",
        href: "/users/users",
        icon: "User",
      },
      {
        label: "Permissions",
        slug: "permissions",
        href: "/users/permission",
        icon: "ShieldCheck",
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
      },
      {
        label: "Cities",
        slug: "cities",
        href: "/master-data/cities",
        icon: "MapPin",
      },
    ],
  },
]
