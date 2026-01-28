"use client"
import { useState } from "react";
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

import { useUsersList } from "./hooks/useUser";
import { SiteHeader } from "@/components/site-header";




export default  function DemoPage() {
  //const data = await getData()

  const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10, // match API per_page
	});
  	const {
		data: response,
		refetch,
		isFetching,
	} = useUsersList(pagination.pageIndex + 1, pagination.pageSize);
	console.log(response, "bjhbvrhg rh");

  return (
    <div className="container mx-auto py-10">
      <DataTable
     header={<SiteHeader />}
        columns={columns}
      data={response?.data ?? []}
      />
    </div>
  )
}