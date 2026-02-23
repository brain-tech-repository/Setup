"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { PageHeader } from "../components/header";
import {
  useCreateUser,
  useUpdateUser,
  useUserById,
} from "../hooks/useUser";
import { UserFormValues } from "../types";
import UserFormUI from "../components/userForm";

/* =======================
   INNER CONTENT
   (useSearchParams HERE)
======================= */

function UserFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode");
  const userId = searchParams.get("id");
  const isEditMode = mode === "edit" && !!userId;

  /* =======================
     FETCH USER (EDIT MODE)
  ======================= */
  const {
    data: user,
    isLoading: isUserLoading,
  } = useUserById(isEditMode ? userId : null);

  /* =======================
     MUTATIONS
  ======================= */
  const createUser = useCreateUser();
  const updateUser = useUpdateUser(userId as string);

  const isSubmitting =
    createUser.isPending || updateUser.isPending;

  /* =======================
     DEFAULT FORM VALUES
  ======================= */
  const defaultValues: UserFormValues = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
    age: user?.age ?? 0,
    city: user?.city ?? "",
     role: user?.role?._id ?? "",
    
  };

  /* =======================
     SUBMIT HANDLER
  ======================= */
  const onSubmit = async (values: UserFormValues) => {
    try {
      if (isEditMode) {
        const { password, ...rest } = values;
        await updateUser.mutateAsync(password ? values : rest);
      } else {
        await createUser.mutateAsync(values);
      }

      router.push("/user-management/users");
    } catch (error) {
      console.error("User submit failed", error);
    }
  };

  /* =======================
     LOADING STATE
  ======================= */
  if (isEditMode && isUserLoading) {
    return <div className="p-4">Loading user...</div>;
  }

  /* =======================
     RENDER
  ======================= */
  return (
    <>
      <PageHeader
        title={isEditMode ? "Edit User" : "Create User"}
        description="Manage basic user details"
        backHref="/user-management/users"
      />

      <UserFormUI
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

export default function UserFormPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading form...</div>}>
      <UserFormContent />
    </Suspense>
  );
}
