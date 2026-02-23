"use client";

import { SiteHeader } from "@/components/site-header";
import { columns } from "./components/columns";
import { DataTable } from "@/components/data-table/data-table";
import { useRoleList } from "./hooks/useRole";

export default function RolesPage() {
  const {
    data: roles = [],
    isLoading,
    isError,
  } = useRoleList();

  return (
    <div className="container mx-auto pb-10 p-1">
      <DataTable
        header={
          <SiteHeader
            title="Roles"   // ✅ FIXED
            actionLabel="Create Role"  // ✅ FIXED
            actionHref="/user-management/roles/form?mode=create" // ✅ FIXED
          />
        }
        columns={columns}
        data={roles}   // ✅ FIXED
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
