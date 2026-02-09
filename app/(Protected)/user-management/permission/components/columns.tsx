"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"



import { useRouter } from "next/navigation";
import { RoleResponseType } from "../types"


export const columns: ColumnDef<RoleResponseType>[] = [
  /* ======================
     SELECT CHECKBOX
  ====================== */
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },


  /* ======================
     USER ID
  ====================== */
  {
    accessorKey: "_id",
    header: () => <span>ID</span>,
    cell: ({ row }) => (
      <span className="text-xs font-mono">
        {row.getValue("_id")}
      </span>
    ),
  },

  /* ======================
     NAME
  ====================== */
  {
    accessorKey: "role_code",
    header: () => <span>Code</span>,
  },

  {
    accessorKey: "role_name",
    header: () => <span>Name</span>,
  },

  /* ======================
     ACTIONS
  ====================== */
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              View User
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/user-management/permission/form?mode=edit&id=${user._id}`
                )
              }
            >
              Edit User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
