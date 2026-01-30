import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChevronsUpDown } from "lucide-react"



export default function Page({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 55)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
       <div className="flex justify-end pt-3">
         <div className="flex justify-end pt-3">
      <SidebarTrigger className=" h-8" />
        <Separator
          orientation="vertical"
          className="mx-0 data-[orientation=vertical]:h-4"
        />
      </div>
    </div>
      <SidebarInset>
        
        {/* <SiteHeader /> */}
         <main className="flex flex-1 flex-col">
          {children}
        </main>
       
      </SidebarInset>
    </SidebarProvider>
  )
}
