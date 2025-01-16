"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/Header";
import { useUserData, useUpdateUser } from "@/queries/user";
import { useUpdatePassword } from "@/queries/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema, updatePasswordSchema } from "./profileValidation";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";

export default function ProfilePage() {
  const { data: userData, isLoading: loadingUser } = useUserData();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: updatePassword } = useUpdatePassword();
  const { toast } = useToast();

  const [editableFields, setEditableFields] = useState<Record<string, boolean>>(
    {
      name: false,
      surname: false,
      email: false,
    },
  );

  const toggleFieldEditable = (field: string) => {
    setEditableFields((prev) => ({ ...prev, [field]: true }));
  };

  const userForm = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: userData?.email || "",
      name: userData?.name || "",
      surname: userData?.surname || "",
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const handleUserUpdate = (data: any) => {
    updateUser(data, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "User data updated successfully.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description:
            error.response?.data?.message || "Failed to update user.",
          variant: "destructive",
        });
      },
    });
  };

  const handlePasswordChange = (data: any) => {
    updatePassword(data, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Password updated successfully.",
        });
        passwordForm.reset();
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description:
            error.response?.data?.message || "Failed to update password.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <Header withBorder>
        <div className="flex items-center py-[27.5px] mr-[40px]">
          <span className="text-lg mr-[22px]">
            {loadingUser
              ? "Loading..."
              : `Welcome, ${userData?.name || "Guest"}`}
          </span>
          <Avatar>
            <AvatarFallback>
              {loadingUser
                ? "..."
                : `${userData?.name?.[0] || ""}${userData?.surname?.[0] || ""}` ||
                  "G"}
            </AvatarFallback>
          </Avatar>
        </div>
      </Header>

      <div className="flex w-full h-full overflow-hidden">
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full px-4 overflow-y-auto">
          <h2 className="text-4xl font-semibold mb-6">Your Profile</h2>
          <div className="flex flex-col gap-10 w-full max-w-4xl">
            <div className="border p-6 rounded-lg shadow-md w-full">
              <Form {...userForm}>
                <form
                  onSubmit={userForm.handleSubmit(handleUserUpdate)}
                  className="flex flex-col gap-4 w-full"
                >
                  <FormField
                    control={userForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="First Name"
                            readOnly={!editableFields.name}
                            className={`${
                              editableFields.name ? "" : "text-gray-500"
                            }`}
                          />
                        </FormControl>
                        {!editableFields.name && (
                          <PencilIcon
                            className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => toggleFieldEditable("name")}
                          />
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={userForm.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Last Name"
                            readOnly={!editableFields.surname}
                            className={`${
                              editableFields.surname ? "" : "text-gray-500"
                            }`}
                          />
                        </FormControl>
                        {!editableFields.surname && (
                          <PencilIcon
                            className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => toggleFieldEditable("surname")}
                          />
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={userForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Email Address"
                            readOnly={!editableFields.email}
                            className={`${
                              editableFields.email ? "" : "text-gray-500"
                            }`}
                          />
                        </FormControl>
                        {!editableFields.email && (
                          <PencilIcon
                            className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => toggleFieldEditable("email")}
                          />
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Update
                  </Button>
                </form>
              </Form>
            </div>

            <div className="border p-6 rounded-lg shadow-md w-full">
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
                  className="flex flex-col gap-4 w-full"
                >
                  <FormField
                    control={passwordForm.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Old Password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="New Password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPasswordConfirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Confirm Password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Change Password
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
