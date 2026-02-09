/* =======================
   USER TYPES
======================= */

export type UserType = {
  name: string;
  email: string;
  password?: string; // optional for update
  age: number;
  city: string;
};

export type UserResponse = UserType & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};


export type UserFormValues = {
  name: string;
  email: string;
  password?: string;
  age: number;
  city: string;
};

export type UserFormUIProps = {
  defaultValues: UserFormValues;
  isEditMode: boolean;
  isLoading?: boolean;
  onSubmit: (values: UserFormValues) => void;
};
