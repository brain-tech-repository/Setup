"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { PageHeader } from "../../users/components/header";
import {
  useCreateRole,
  useRoleById,
  useUpdateRole,
} from "../hooks/useRole";
import { RoleFormValues } from "../types";
import RoleFormUI from "../components/roleForm";

/* =======================
   INNER CONTENT
   (useSearchParams HERE)
======================= */

function RoleFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = searchParams.get("mode");
  const roleId = searchParams.get("id");
  const isEditMode = mode === "edit" && !!roleId;

  /* =======================
      FETCH ROLE (EDIT MODE)
  ======================= */
  const {
    data: role,
    isLoading: isRoleLoading,
  } = useRoleById(isEditMode ? roleId : null);

  /* =======================
      MUTATIONS
  ======================= */
  const createRole = useCreateRole();
  const updateRole = useUpdateRole(roleId as string);

  const isSubmitting =
    createRole.isPending || updateRole.isPending;

  /* =======================
      DEFAULT FORM VALUES
  ======================= */
  const defaultValues: RoleFormValues = {
    role_code: role?.role_code ?? "",
    role_name: role?.role_name ?? "",
  };

  /* =======================
      SUBMIT HANDLER
  ======================= */
  const onSubmit = async (values: RoleFormValues) => {
    try {
      if (isEditMode) {
        await updateRole.mutateAsync(values);
      } else {
        await createRole.mutateAsync(values);
      }

      router.push("/user-management/roles");
    } catch (error) {
      console.error("Role submit failed", error);
    }
  };

  if (isEditMode && isRoleLoading) {
    return <div className="p-4">Loading role...</div>;
  }

  return (
    <>
      <PageHeader
        title={isEditMode ? "Edit Role" : "Create Role"}
        description="Manage role details"
        backHref="/user-management/roles"
      />

      <RoleFormUI
        defaultValues={defaultValues}
        isEditMode={isEditMode}
        isLoading={isSubmitting}
        onSubmit={onSubmit}
      />
    </>
  );
}

/* =======================
   PAGE (Suspense Wrapper)
======================= */

export default function RoleFormPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading form...</div>}>
      <RoleFormContent />
    </Suspense>
  );
}
