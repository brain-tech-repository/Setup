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
