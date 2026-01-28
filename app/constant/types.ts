import type { LucideIcon } from "lucide-react"

export type SidebarItem = {
  title: string
  url: string
  icon: LucideIcon
   children?: SidebarItem[] // ✅ add children

}
