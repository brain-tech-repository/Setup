"use client"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card } from "@/components/ui/card"
import { useMemo } from "react"

interface Props {
  data: any
    loading?: boolean

}
export default function SalesReportGraph({ data, loading }: Props) {

  /* Extract correct dataset automatically */
  const rows = useMemo(() => {
    if (Array.isArray(data?.Result?.details_wiase_data)) {
      return data.Result.details_wiase_data
    }
    if (Array.isArray(data?.Result?.headers_wiase_data)) {
      return data.Result.headers_wiase_data
    }
    return []
  }, [data])

  /* Transform data for graph */
  const chartData = useMemo(() => {
    return rows
      .filter((row: any) => row.invoice_date && row.total)
      .map((row: any) => ({
        date: row.invoice_date.split(" ")[0],
        total: Number(row.total),
      }))
  }, [rows])

 if (loading) {
  return <div className="p-6 text-center">Loading graph...</div>
}

if (!loading && !chartData.length) {
  return <div className="p-6 text-center">No graph data available</div>
}

  return (
    <Card className="p-6">
      <div className="h-[400px]">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>
    </Card>
  )
}