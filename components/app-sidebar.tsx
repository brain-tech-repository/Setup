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
import { useEffect, useState } from "react"

import { getIcon, type MenuItem } from "@/lib/menu/icon-map"
import { useSidebarMenus } from "@/lib/menu/menu.service"

export function AppSidebar() {

  // 🔥 Safely load user from localStorage (client only)



  // 🔥 Fetch sidebar menus by role
   const { data: apiMenus, isLoading } = useSidebarMenus()


  const menus: MenuItem[] = apiMenus ?? []

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

        {/* LOGO */}
        <Link
          href="/dashboard"
          className="flex h-14 items-center gap-2 border-b px-4"
        >
          <Image
            src="/logo.svg"
            alt="CoreExl"
            width={28}
            height={28}
            className="shrink-0"
          />
          <span className="truncate text-sm font-semibold group-data-[collapsible=icon]:hidden">
            CoreExl
          </span>
        </Link>

        {/* MENU */}
        {menus.map((menu: MenuItem) => {
          const ParentIcon = getIcon(menu.icon)
          const children = menu.children ?? []
          const hasChildren = children.length > 0

          return (
            <SidebarMenu key={menu.slug}>
              <Collapsible.Root>
                <SidebarMenuItem>
                  <Collapsible.Trigger asChild>
                    <SidebarMenuButton className="group justify-between">
                      <span className="flex items-center gap-2">
                        <ParentIcon size={18} />
                        <span>{menu.label}</span>
                      </span>

                      {hasChildren && <ChevronDown />}
                    </SidebarMenuButton>
                  </Collapsible.Trigger>

                  {hasChildren && (
                    <Collapsible.Content>
                      <SidebarMenuSub>
                        {children.map(sub => {
                          const ChildIcon = getIcon(sub.icon)

                          return (  
                            <SidebarMenuSubItem key={sub.slug}>
                              <SidebarMenuButton asChild>
                                <Link href={sub.href ?? "#"}>
                                  <ChildIcon size={16} />
                                  <span>{sub.label}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </Collapsible.Content>
                  )}
                </SidebarMenuItem>
              </Collapsible.Root>
            </SidebarMenu>
          )
        })}

      </SidebarContent>
    </Sidebar>
  )
}