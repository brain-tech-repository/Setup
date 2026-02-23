"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BarChart2, Calendar as CalendarIcon, TableIcon } from "lucide-react"
import { format } from "date-fns"

interface SalesReportFiltersProps {
    fromDate?: Date
    toDate?: Date
    reportType: string
    setFromDate: (date?: Date) => void
    setToDate: (date?: Date) => void
    setReportType: (value: string) => void
    onSubmit: (type: "table" | "graph") => void
    loading: boolean
    view: "table" | "graph"
    setView: (value: "table" | "graph") => void

}

export default function SalesReportFilters({
    fromDate,
    toDate,
    reportType,
    setFromDate,
    setToDate,
    setReportType,
    onSubmit,
    loading,
    view,
    setView,
}: SalesReportFiltersProps) {
    return (
       <div className="flex flex-wrap items-end justify-between gap-4 px-2">

  {/* LEFT SIDE */}
  <div className="flex flex-wrap items-end gap-4">

    {/* From Date */}
    <div className="flex flex-col gap-1">
      <label className="text-sm">From Date</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {fromDate ? format(fromDate, "dd-MM-yyyy") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={fromDate} onSelect={setFromDate} />
        </PopoverContent>
      </Popover>
    </div>

    {/* To Date */}
    <div className="flex flex-col gap-1">
      <label className="text-sm">To Date</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {toDate ? format(toDate, "dd-MM-yyyy") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={toDate} onSelect={setToDate} />
        </PopoverContent>
      </Popover>
    </div>

    {/* Report Type */}
    <div className="flex flex-col gap-1 w-[180px]">
      <label className="text-sm">Report Type</label>
      <Select value={reportType} onValueChange={setReportType}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Header Wise</SelectItem>
          <SelectItem value="2">Details Wise</SelectItem>
        </SelectContent>
      </Select>
    </div>

  </div>

  {/* RIGHT SIDE BUTTONS */}
  <div className="flex gap-3">

    <Button
      variant={view === "table" ? "default" : "outline"}
      onClick={() => {
        setView("table")
        onSubmit("table")
      }}
      disabled={loading}
    >
      <TableIcon className="mr-2 h-4 w-4" />
      {loading && view === "table" ? "Loading..." : "Table"}
    </Button>

    <Button
      variant={view === "graph" ? "default" : "outline"}
      onClick={() => {
        setView("graph")
        onSubmit("graph")
      }}
      disabled={loading}
    >
      <BarChart2 className="mr-2 h-4 w-4" />
      {loading && view === "graph" ? "Loading..." : "Graph"}
    </Button>

  </div>

</div>
    )
}