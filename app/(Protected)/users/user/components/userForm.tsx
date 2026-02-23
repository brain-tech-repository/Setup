"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoleList } from "../../permission/hooks/useRole";



/* =======================
   TYPES
======================= */

export type UserFormValues = {
  name: string;
  email: string;
  password?: string;
  age: number;
  city: string;
  role: string;   // ✅ FIXED
};

type UserFormUIProps = {
  defaultValues: UserFormValues;
  isEditMode: boolean;
  isLoading?: boolean;
  onSubmit: (values: UserFormValues) => void;
};

/* =======================
   COMPONENT
======================= */

export default function UserFormUI({
  defaultValues,
  isEditMode,
  isLoading = false,
  onSubmit,
}: UserFormUIProps) {

  const form = useForm<UserFormValues>({
    defaultValues,
  });

  const { data: roles = [], isLoading: rolesLoading } = useRoleList(); // ✅ FIXED

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-2">

          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}   // ✅ use value not defaultValue
                    disabled={isLoading || rolesLoading}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {roles.map((role: any) => (
                        <SelectItem key={role._id} value={role._id}>
                          {role.role_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      disabled={isLoading || isEditMode}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Password (Create Only) */}
            {!isEditMode && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} disabled={isLoading} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {/* Age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? 0
                            : Number(e.target.value)
                        )
                      }
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                </FormItem>
              )}
            />

          </CardContent>

          <CardFooter className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-b from-pink-300 to-sky-300 text-white"
            >
              {isLoading
                ? "Saving..."
                : isEditMode
                ? "Update User"
                : "Create User"}
            </Button>
          </CardFooter>

        </Card>
      </form>
    </Form>
  );
}
