// lib/default-menus.ts
import type { MenuItem } from "@/lib/icon-map";

/* =========================
   FULL PERMISSION (fallback)
========================= */

const FULL_PERMISSION = {
  view: true,
  list: true,
  create: true,
  update: true,
  delete: true,
  approve: true,
};

/* =========================
   DEFAULT SIDEBAR MENUS
========================= */

export const DEFAULT_MENUS: MenuItem[] = [
  /* =====================
     GETTING STARTED
  ===================== */
  

  /* =====================
     USER MANAGEMENT
  ===================== */
  {
    label: "User Management",
    icon: "Users",
    children: [
      {
        label: "Users",
        href: "/user-management/users",
        icon: "User",
        permissions: FULL_PERMISSION,
      },
      {
        label: "Permissions",
        href: "/user-management/permissions",
        icon: "ShieldCheck",
        permissions: FULL_PERMISSION,
      },
    ],
  },

  /* =====================
     MASTER DATA
  ===================== */
  {
    label: "Master Data Setup",
    icon: "Database",
    children: [
      {
        label: "Countries",
        href: "/master-data/countries",
        icon: "Globe",
        permissions: FULL_PERMISSION,
      },
      {
        label: "Cities",
        href: "/master-data/cities",
        icon: "MapPin",
        permissions: FULL_PERMISSION,
      },
    ],
  },

  /* =====================
     APPLICATION
  ===================== */
  
];
