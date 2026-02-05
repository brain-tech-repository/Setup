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

/* =======================
   TYPES
======================= */

export type UserFormValues = {
  name: string;
  email: string;
  password?: string;
  age: number;
  city: string;
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

  // ✅ Reset form when API data loads
  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-2">

          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">

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
                      disabled={isLoading || isEditMode} // 🔐 lock email on edit
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Password (create only) */}
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
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? 0 : Number(value)
                        );
                      }}
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
