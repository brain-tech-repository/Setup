export type RoleType = {
  role_code: string;
  role_name: string;
};

export type RoleResponseType = RoleType & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type RoleFormValues = {
  role_code: string;
  role_name: string;
};

export type RoleFormUIProps = {
  defaultValues: RoleFormValues;
  isEditMode: boolean;
  isLoading?: boolean;
  onSubmit: (values: RoleFormValues) => void;
};
