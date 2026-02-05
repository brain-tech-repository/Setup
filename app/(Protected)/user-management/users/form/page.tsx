"use client";

import { useRouter, useSearchParams } from "next/navigation";
import UserFormUI, { UserFormValues } from "../components/userForm";
import { PageHeader } from "../components/header";

import {
  useCreateUser,
  useUpdateUser,
  useUserById,
} from "../hooks/useUser";

export default function UserFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode"); // "create" | "edit"
  const userId = searchParams.get("id");
  const isEditMode = mode === "edit";

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
  };

  /* =======================
     SUBMIT HANDLER
  ======================= */
  const onSubmit = async (values: UserFormValues) => {
    console.log("FORM SUBMIT VALUES:", values); // 🔍 DEBUG

    try {
      if (isEditMode) {
        // Remove empty password on update
        const { password, ...rest } = values;
        await updateUser.mutateAsync(
          password ? values : rest
        );
      } else {
        await createUser.mutateAsync(values);
      }

      router.push("/user-management/users");
    } catch (error) {
      console.error("User submit failed", error);
    }
  };

  /* =======================
     LOADING STATE (EDIT)
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
