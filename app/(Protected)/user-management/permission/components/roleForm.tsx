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

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RolePermissionMenu from "./permissionMenu";

/* =======================
   TYPES
======================= */

export type RoleFormValues = {
  role_code: string;
  role_name: string;
};

type RoleFormUIProps = {
  defaultValues: RoleFormValues;
  isEditMode: boolean;
  isLoading?: boolean;
  onSubmit: (values: RoleFormValues) => void;
};

/* =======================
   COMPONENT
======================= */

export default function RoleFormUI({
  defaultValues,
  isEditMode,
  isLoading = false,
  onSubmit,
}: RoleFormUIProps) {
  const form = useForm<RoleFormValues>({
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* =======================
            ROLE DETAILS CARD
        ======================= */}
        <Card className="mx-2">
          <CardHeader>
            <CardTitle>Role Details</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Role Code */}
            <FormField
              control={form.control}
              name="role_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading || isEditMode}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Role Name */}
            <FormField
              control={form.control}
              name="role_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* =======================
            PERMISSIONS CARD
        ======================= */}
        <Card className="mx-2">
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
          </CardHeader>

          <CardContent>
            <RolePermissionMenu />
          </CardContent>
        </Card>

        {/* =======================
            ACTIONS
        ======================= */}
        <CardFooter className="flex justify-end gap-4 px-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-b from-pink-300 to-sky-300 text-white"
          >
            {isLoading
              ? "Saving..."
              : isEditMode
              ? "Update Role"
              : "Create Role"}
          </Button>
        </CardFooter>

      </form>
    </Form>
  );
}
