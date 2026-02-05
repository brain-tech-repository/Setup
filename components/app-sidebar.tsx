"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import * as Collapsible from "@radix-ui/react-collapsible"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { iconMap, type MenuItem } from "@/lib/icon-map"
import { useRoleMenus } from "@/lib/get-menus"
import { getLocal } from "@/lib/localStorageUtils"
import { DEFAULT_MENUS } from "@/lib/default-menus"
export function AppSidebar() {
  // 🔐 later this should come from auth/user profile
 const userAuthData = getLocal("user");
	// const id = userAuthData ? userAuthData.user.id : null;
    const userId = userAuthData?.user?.id ?? null;

  const { data: menus, isLoading, isError } = useRoleMenus(userId)

    const menus1: MenuItem[] =
    !isLoading && !isError && menus?.length
      ? menus
      : DEFAULT_MENUS;
  
  

  if (isLoading) {
    return (
      <Sidebar variant="inset">
        <SidebarContent className="p-4 text-sm text-muted-foreground">
          Loading menu...
        </SidebarContent>
      </Sidebar>
    )
  }

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarContent>

        {/* ================= LOGO / HEADER ================= */}
        <Link
          href="/dashboard"
          className="flex h-14 items-center gap-2 border-b px-4"
        >
          {/* Logo Icon */}
          <Image
            src="/logo.svg"          // 🔁 change if needed
            alt="CoreExl"
            width={28}
            height={28}
            className="shrink-0"
          />

          {/* App Name (auto-hide on collapse) */}
          <span className="truncate text-sm font-semibold group-data-[collapsible=icon]:hidden">
            CoreExl
          </span>
        </Link>

        {/* ================= MENU ================= */}
        {menus1?.map((menu: MenuItem) => {
          const ParentIcon = iconMap[menu.icon]

          return (
            <SidebarMenu key={menu.label}>
              <Collapsible.Root>
                <SidebarMenuItem>

                  {/* ===== Parent Menu (toggle) ===== */}
                  <Collapsible.Trigger asChild>
                    <SidebarMenuButton className="group justify-between">
                      <span className="flex items-center gap-2">
                        {ParentIcon && <ParentIcon size={18} />}
                        <span className="group-data-[collapsible=icon]:hidden">
                          {menu.label}
                        </span>
                      </span>

                      {/* ✅ RIGHT ➡️ when closed | DOWN ⬇️ when open */}
                      <ChevronDown
                        className="
        size-4 shrink-0
        -rotate-90
        transition-transform
        group-data-[state=open]:rotate-0
        group-data-[collapsible=icon]:hidden
      "
                      />
                    </SidebarMenuButton>
                  </Collapsible.Trigger>


                  {/* ===== Sub Menu ===== */}
                  <Collapsible.Content>
                    <SidebarMenuSub>
                      {menu.children?.map((sub) => {
                      if (!sub.permissions?.view) return null

                        const ChildIcon = iconMap[sub.icon]

                        return (
                          <SidebarMenuSubItem key={sub.label}>
                            <SidebarMenuButton asChild>
                              <Link href={sub.href ?? "#"}>
                                {ChildIcon && <ChildIcon size={16} />}
                                <span className="group-data-[collapsible=icon]:hidden">
                                  {sub.label}
                                </span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </Collapsible.Content>

                </SidebarMenuItem>
              </Collapsible.Root>
            </SidebarMenu>
          )
        })}
      </SidebarContent>
    </Sidebar>
  )
}
