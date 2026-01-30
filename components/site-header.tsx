import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"

type SiteHeaderProps = {
  title: string
  actionLabel?: string
  actionHref?: string
}

export function SiteHeader({actionHref, actionLabel}: SiteHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
       
       <div className="flex items-center space-x-2">
					<div className="h-5 w-1 rounded-full bg-gradient-to-b from-pink-300 to-sky-300" />
					<h1 className="font-bold text-gray-900 text-lg dark:text-white">
					Documentation
					</h1>
				</div>
        <div className="ml-auto flex items-center gap-2">
          {actionLabel && actionHref && (
            <Button variant="outline" asChild size="sm" className="hidden sm:flex">
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
