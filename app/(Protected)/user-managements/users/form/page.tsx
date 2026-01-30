"use client";

import { useRouter } from "next/navigation";
import UserFormUI, {
  UserFormValues,
} from "../components/userForm";
import { PageHeader } from "../components/header";

type UserFormPageProps = {
  initialValues?: Partial<UserFormValues>;
  isEditMode: boolean;
  userId?: number;
};

export default function UserForm({
  initialValues,
  isEditMode,
  userId,
}: UserFormPageProps) {
  const router = useRouter();

  // ✅ default form values
  const defaultValues: UserFormValues = {
    role_id: "user",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    status: "Active",
    ...initialValues, // override in edit mode
  };

  const onSubmit = async (values: UserFormValues) => {
    try {
      if (isEditMode) {
        console.log("UPDATE USER", userId, values);
        // await updateUser(userId!, values);
      } else {
        console.log("CREATE USER", values);
        // await createUser(values);
      }

      router.back();
    } catch (error) {
      console.error("User submit failed", error);
    }
  };

  return (
    <>
      <PageHeader
        title={isEditMode ? "Edit User" : "Create User"}
        description="Manage user details and permissions"
        backHref="/user-managements/users"
      />

      <UserFormUI
        defaultValues={defaultValues}
        isEditMode={isEditMode}
        onSubmit={onSubmit}
      />
    
    </>
  );
}
