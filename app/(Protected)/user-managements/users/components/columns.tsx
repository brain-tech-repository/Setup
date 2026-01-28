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
import { DataTableColumnHeader } from "./data-table-column-header"
import { UserType } from "../types"

export const columns: ColumnDef<UserType>[] = [
  // ✅ Select checkbox
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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

  // ✅ User Code (sortable by ID)
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="User ID" />,
  },

  // ✅ User Code
  {
    accessorKey: "user_code",
    header: () => <span>User Code</span>,
  },

  // ✅ First Name
  {
    accessorKey: "first_name",
    header: () => <span>First Name</span>,
  },

  // ✅ Last Name
  {
    accessorKey: "last_name",
    header: () => <span>Last Name</span>,
  },

  // ✅ Email
  {
    accessorKey: "email",
    header: () => <span>Email</span>,
  },

  // ✅ Role (nested object)
  {
    accessorFn: (row) => row.role?.name || "-",
    id: "role",
    header: () => <span>Role</span>,
  },

  // ✅ City (nested object)
  {
    accessorFn: (row) => row.city?.city_name || "-",
    id: "city",
    header: () => <span>City</span>,
  },

  // ✅ Country (nested object)
  {
    accessorFn: (row) => row.country?.country_name || "-",
    id: "country",
    header: () => <span>Country</span>,
  },

  // ✅ Status
  {
    accessorKey: "status",
    header: () => <span>Status</span>,
  },

  // ✅ Actions Dropdown
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(user.id))}>
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Edit User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
