"use client";

import { useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useUsersList } from "./hooks/useUser";
import { SiteHeader } from "@/components/site-header";

export default function UsersPage() {
  const [pagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: response } = useUsersList(
    pagination.pageIndex + 1,
    pagination.pageSize
  );

  return (
    <div className="container mx-auto pb-10 p-1">
      <DataTable
        header={
          <SiteHeader
            title="Users"
            actionLabel="Create"
           actionHref={`/user-managements/users/form?mode=create&backHref=/user-managements`}

          />
        }
        columns={columns}
        data={response?.data ?? []}
      />
    </div>
  );
}
