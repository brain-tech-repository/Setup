/* =======================
   USER TYPES
======================= */

export type UserType = {
  name: string
  email: string
  password?: string
  age: number
  city: string
  role: string   // 🔥 ADD ROLE (ObjectId string)
}

/* =======================
   USER RESPONSE (Populated)
======================= */

export type UserResponse = {
  _id: string
  name: string
  email: string
  age: number
  city: string

  role?: {
    _id: string
    role_code: string
    role_name: string
  }

  createdAt: string
  updatedAt: string
}

/* =======================
   FORM VALUES
======================= */

export type UserFormValues = {
  name: string
  email: string
  password?: string
  age: number
  city: string
  role: string   // 🔥 IMPORTANT
}

/* =======================
   FORM UI PROPS
======================= */

export type UserFormUIProps = {
  defaultValues: UserFormValues
  isEditMode: boolean
  isLoading?: boolean
  onSubmit: (values: UserFormValues) => void
}
