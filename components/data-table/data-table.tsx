"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  RowSelectionState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import React, { ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DataTablePagination } from "@/components/data-table/pagination"
import { Settings2, Trash2 } from "lucide-react"
import { useDeleteRole } from "@/app/(Protected)/user-management/permission/hooks/useRole"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  header?: ReactNode;
  isLoading?: boolean;
  isError?: boolean;

}
export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  isError,
  header
}: DataTableProps<TData, TValue>) {


  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const selectedCount = table.getSelectedRowModel().rows.length

  const { mutate: bulkDelete } = useDeleteRole();


  return (
    <>
      <div className=" gy-1"> {header}</div>
      <div className="flex flex-1 flex-col">

        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={table.getColumn("email")?.getFilterValue() as string}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Settings2 />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="overflow-hidden rounded-md border ">
          {<Table>
            <TableHeader className="sticky top-0 z-20 bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 dark:from-neutral-800 dark:via-neutral-850 dark:to-neutral-800">

              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="
    transition-all
    hover:bg-gradient-to-r hover:from-blue-50 hover:via-transparent hover:to-blue-50
    dark:hover:from-blue-950/40 dark:hover:to-blue-950/40
    data-[state=selected]:bg-blue-100/60
    dark:data-[state=selected]:bg-blue-950/50
  "
                  >

                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="
    border-r border-b border-gray-200 dark:border-neutral-700
    text-sm text-gray-800 dark:text-gray-200
  "
                      >

                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>


          </Table>}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5  pt-0 pb-2 ps-2">
            {selectedCount > 0 && (
              <div
                className="
      sticky top-0 z-30
      flex items-center justify-between
      px-4 py-2 mt-2
      rounded-md
      bg-white/70 dark:bg-black/60
      backdrop-blur
      border border-red-200 dark:border-red-900
      shadow-sm
    "
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {selectedCount} selected
                </span>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const ids = table
                      .getSelectedRowModel()
                      .flatRows
                      .map((row) => row.getValue("_id") as string);

                    console.log("DELETE THESE:", ids);

                    ids.forEach((id) => bulkDelete(id));
                  }}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

              </div>
            )}
          </div>

        </div>
        <div className="text-muted-foreground flex-1 text-sm mx-4 mt-5">
          <DataTablePagination table={table} />
        </div>

      </div>
    </>

  )
}