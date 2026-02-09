"use client";
import { SiteHeader } from "@/components/site-header";
import { columns } from "./components/columns";
import { DataTable } from "../../../../components/data-table/data-table";
import { useRolelist } from "./hooks/useRole";
import { log } from "console";

export default function UsersPage() {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useRolelist();

  console.log("usersss",users);
  

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
