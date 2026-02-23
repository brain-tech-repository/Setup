"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { X } from "lucide-react"

interface FilterOption {
  id: number | string
  [key: string]: any
}

export interface FilterConfig {
  id: string
  name: string
  data?: FilterOption[]
  field: string
  dependsOn?: string | null
}

interface Props {
  filters: FilterConfig[]
  dropped: string[]
  selected: Record<string, string[]>
  openFilter: string | null
  setOpenFilter: (val: string | null) => void
  setDropped: React.Dispatch<React.SetStateAction<string[]>>
  setSelected: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
}

export default function SalesReportDragFilters({
  filters,
  dropped,
  selected,
  openFilter,
  setOpenFilter,
  setDropped,
  setSelected,
}: Props) {

  /* ================= DRAG START ================= */
  const handleDragStart = (id: string, e: React.DragEvent) => {
    e.dataTransfer.setData("filterId", id)
  }

  /* ================= DROP ================= */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const id = e.dataTransfer.getData("filterId")

    if (!dropped.includes(id)) {
      setDropped((prev) => [...prev, id])
    }
  }

  /* ================= TOGGLE SELECT ================= */
  const toggleItem = (filterId: string, itemId: string) => {
    setSelected((prevSelected) => {
      const current = prevSelected[filterId] || []

      const updated = current.includes(itemId)
        ? current.filter((i) => i !== itemId)
        : [...current, itemId]

      const newSelected: Record<string, string[]> = {
        ...prevSelected,
        [filterId]: updated,
      }

      /* 🔥 CLEAR CHILDREN RECURSIVELY */
      const clearChildren = (parentId: string) => {
        const child = filters.find(
          (f) => f.dependsOn === parentId
        )

        if (child) {
          delete newSelected[child.id]

          setDropped((prevDropped) =>
            prevDropped.filter((f) => f !== child.id)
          )

          clearChildren(child.id)
        }
      }

      clearChildren(filterId)

      return newSelected
    })
  }

  /* ================= REMOVE FILTER ================= */
  const removeFilter = (id: string) => {
    setDropped((prev) => prev.filter((f) => f !== id))

    setSelected((prev) => {
      const updated = { ...prev }
      delete updated[id]
      return updated
    })
  }

  return (
    <div className="space-y-4">

      {/* ================= DRAG BADGES ================= */}
      <div className="flex gap-3 flex-wrap">

        {filters.map((filter) => {
          const isDisabled =
            filter.dependsOn &&
            !selected[filter.dependsOn]?.length

          return (
          <Badge
  key={filter.id}
  draggable={!isDisabled}
  onDragStart={(e) =>
    !isDisabled && handleDragStart(filter.id, e)
  }
  className={`
    px-4 py-2
    text-sm font-medium
    rounded-full
    transition-all duration-200
    select-none
    border
    ${
      isDisabled
        ? "opacity-40 cursor-not-allowed bg-gray-200 text-gray-500 border-gray-300"
        : "cursor-grab bg-blue-50 text-blue-700 border-blue-200 hover:bg-green-100 active:cursor-grabbing shadow-sm hover:shadow-md"
    }
  `}
>
  {filter.name}
</Badge>
          )
        })}
      </div>

      {/* ================= DROP AREA ================= */}
      <div
        className="border border-dashed p-4 rounded-lg min-h-[100px]"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

          {dropped.map((id) => {
            const filter = filters.find((f) => f.id === id)
            if (!filter) return null

            return (
              <div key={id} className="flex items-center gap-2">

                <Popover
                  open={openFilter === id}
                  onOpenChange={(open) =>
                    setOpenFilter(open ? id : null)
                  }
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {filter.name}
                      <Badge>
                        {selected[id]?.length || 0}
                      </Badge>
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-[240px] p-0">
                    <Command>
                      <CommandInput
                        placeholder={`Search ${filter.name}`}
                      />
                      <CommandList>
                        <CommandEmpty>No results</CommandEmpty>
                        <CommandGroup>

                          {filter.data?.map((item) => (
                            <CommandItem
                              key={item.id}
                              onSelect={() =>
                                toggleItem(id, String(item.id))
                              }
                              className="flex justify-between"
                            >
                              {item[filter.field]}
                              {selected[id]?.includes(
                                String(item.id)
                              ) && "✓"}
                            </CommandItem>
                          ))}

                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFilter(id)}
                >
                  <X className="h-4 w-4" />
                </Button>

              </div>
            )
          })}

        </div>
      </div>

    </div>
  )
}



