"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Props {
  data: any
  reportType: string
  loading: boolean
  totalCount?: number
}

export default function SalesReportTable({
  data,
  loading,
  totalCount,
}: Props) {

  const [page, setPage] = useState(1)
  const pageSize = 10

  // ✅ Automatically detect which dataset exists
  const rows = useMemo(() => {
    if (Array.isArray(data?.Result?.details_wiase_data)) {
      return data.Result.details_wiase_data
    }

    if (Array.isArray(data?.Result?.headers_wiase_data)) {
      return data.Result.headers_wiase_data
    }

    return []
  }, [data])

  // ✅ Detect if this is details-wise
  const isDetails = Array.isArray(data?.Result?.details_wiase_data)

  const totalPages = Math.ceil(rows.length / pageSize)

  const paginatedData = rows.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  // Reset page when data changes
  useEffect(() => {
    setPage(1)
  }, [rows])

  if (loading) {
    return <p className="p-4">Loading...</p>
  }

  return (
    <div className="space-y-4">

      {/* RECORD COUNT */}
      <div className="text-sm text-muted-foreground">
        Total Records: {totalCount ?? rows.length}
      </div>

      <div className="rounded-md border">
        <Table>

          {/* ================= TABLE HEADER ================= */}

          <TableHeader>
            <TableRow >
              <TableHead>Invoice No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>

              {isDetails && (
                <>
                  <TableHead>Material</TableHead>
                  <TableHead>Qty</TableHead>
                </>
              )}

              <TableHead>Total</TableHead>
              <TableHead>Warehouse</TableHead>
              <TableHead>Route</TableHead>
            </TableRow>
          </TableHeader>

          {/* ================= TABLE BODY ================= */}

          <TableBody>
            {paginatedData.map((row: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{row.invoice_number ?? "-"}</TableCell>
                <TableCell>
                  {row.invoice_date?.split(" ")[0] ?? "-"}
                </TableCell>
                <TableCell>{row.customer_name ?? "-"}</TableCell>

                {isDetails && (
                  <>
                    <TableCell>{row.material_name ?? "-"}</TableCell>
                    <TableCell>{row.quantity ?? "-"}</TableCell>
                  </>
                )}

                <TableCell>
                  {row.total
                    ? `${row.currency_notation} ${Number(row.total).toLocaleString()}`
                    : "-"}
                </TableCell>

                <TableCell>{row.warehouse_name ?? "-"}</TableCell>
                <TableCell>{row.route_name ?? "-"}</TableCell>
              </TableRow>
            ))}

            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={isDetails ? 8 : 6} className="text-center py-6">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </div>

      {/* ================= PAGINATION ================= */}

      {totalPages > 1 && (
        <div className="flex justify-end gap-2 items-center">

          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <span className="text-sm">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>

        </div>
      )}
    </div>
  )
}