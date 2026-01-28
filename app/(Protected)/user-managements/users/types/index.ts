/**
 * User Feature Types
 * Centralized type definitions for all user-related operations
 */

import { z } from "zod";

// ✅ Nested objects
export type Role = {
  id: number;
  name: string;
};

export type City = {
  id: number;
  city_name: string;
};

export type Country = {
  id: number;
  country_name: string;
};

export type Company = {
  id: number;
  name: string;
};

// ✅ Domain model matching API payload
export type UserType = {
  id: number;
  user_code: string;
  role_id: number;
  first_name: string;
  last_name: string;
  username: string;
  dob: string; // ISO date string
  password?: string;
  address: string;
  city_id: number | null;
  country_id: number | null;
  zip: string;
  email: string;
  contact_no: string;
  profile_photo: string | null;
  company_id: number | null;
  status: "Active" | "Inactive";
  is_admin: number;
  warehouse_access: number;
  updated_at: string;
  deleted_at?: string | null;

  // Nested objects
  role?: Role | null;
  city?: City | null;
  country?: Country | null;
  company?: Company | null;
};

// ✅ API Response types
export type UsersPagination = {
  current_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  per_page: number;
  last_page: number;
  total: number;
};

export type UsersResponse = {
  status: boolean;
  message: string;
  data: UserType[];
  pagination: UsersPagination;
};

export type UserResponseById = {
  status: boolean;
  message: string;
  data: UserType;
};

// ✅ Zod Schema for Form Validation
export const userFormSchema = z.object({
  role_id: z.number().min(1, "Role is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  password: z
    .string()
    .refine(
      (val) => val.length === 0 || val.length >= 6,
      "Password must be at least 6 characters when provided"
    )
    .optional(),
  address: z.string().optional(),
  city_id: z.number().nullable().optional(),
  country_id: z.number().nullable().optional(),
  zip: z.string().optional(),
  email: z.string().optional(),
  contact_no: z
    .string()
    .min(10, "Phone must be 10+ digits")
    .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format"),
  profile_photo: z.string().nullable().optional(),
  company_id: z.number().nullable().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

// ✅ Inferred Type for Form
export type UserFormData = z.infer<typeof userFormSchema>;

// ✅ Table/List schema type
export type ColumnSchema = UserType;

// ✅ Props for Form Components
export interface UserFormProps {
  initialValues?: Partial<UserFormData>;
  onSubmit?: (values: UserFormData) => Promise<void>;
  isEditMode?: boolean;
  isLoading?: boolean;
  backHref?: string;
}
