"use client";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

import { SiteHeader } from "@/components/site-header";
import { useUsersList } from "./hooks/useUser";

export default function UsersPage() {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useUsersList();

  return (
    <div className="container mx-auto pb-10 p-1">
      <DataTable
        header={
          <SiteHeader
            title="Users"
            actionLabel="Create"
            actionHref="/user-management/users/form?mode=create"
          />
        }
        columns={columns}
        data={users}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
