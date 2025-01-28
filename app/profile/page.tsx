"use client";

import { useUpdateUser, useUserData } from "@/queries/user";
import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/Header";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdatePassword } from "@/queries/auth";
import { updatePasswordSchema, updateUserSchema } from "./profileValidation";
import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/Spinner";

export default function ProfilePage() {
  const { data: userData, isLoading: loadingUser } = useUserData();
  const { mutate: updateUser, isLoading: updatingUser } = useUpdateUser();
  const { mutate: updatePassword, isLoading: updatingPassword } =
    useUpdatePassword();

  const [editableFields, setEditableFields] = useState<Record<string, boolean>>(
    {
      name: false,
      surname: false,
      email: false,
    },
  );
  const [updatedUserData, setUpdatedUserData] = useState({
    name: userData?.name || "",
    surname: userData?.surname || "",
  });

  const toggleFieldEditable = (field: string) => {
    setEditableFields((prev) => ({ ...prev, [field]: true }));
  };

  const userForm = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: "",
      name: "",
      surname: "",
    },
  });

  const { isDirty: isUserDirty } = useFormState({ control: userForm.control });

  useEffect(() => {
    if (!loadingUser && userData) {
      userForm.reset({
        email: userData.email,
        name: userData.name,
        surname: userData.surname,
      });
      setUpdatedUserData({
        name: userData.name,
        surname: userData.surname,
      });
    }
  }, [loadingUser, userData, userForm]);

  const passwordForm = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const { isDirty: isPasswordDirty } = useFormState({
    control: passwordForm.control,
  });

  const handleUserUpdate = (data: any) => {
    updateUser(data, {
      onSuccess: () => {
        setUpdatedUserData({
          name: data.name,
          surname: data.surname,
        });

        userForm.reset(data);
        setEditableFields({ name: false, surname: false, email: false });
      },
    });
  };

  const handlePasswordChange = (data: any) => {
    updatePassword(data, {
      onSuccess: () => {
        passwordForm.reset();
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
              : `Welcome, ${updatedUserData?.name || "Guest"}`}
          </span>
          <Avatar>
            <AvatarFallback>
              {loadingUser
                ? "..."
                : `${updatedUserData?.name?.[0] || ""}${updatedUserData?.surname?.[0] || ""}` ||
                  "G"}
            </AvatarFallback>
          </Avatar>
        </div>
      </Header>

      <div className="flex w-full h-full">
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full h-full px-16 py-10">
          <div className="flex w-full h-full min-h-[91px] max-h-[91px] gap-[30px] items-center">
            <h2 className="text-4xl font-normal line-">Your profile</h2>
          </div>

          <div className="flex flex-col gap-10 w-full h-full justify-center items-center">
            <div className="flex w-full h-full gap-10 justify-center">
              {/* AVATAR */}
              <div className="flex flex-col items-center justify-center w-full max-w-[512px] max-h-[512px] border rounded-lg">
                <Avatar className="w-52 h-52">
                  <AvatarFallback className="text-4xl">
                    {`${userForm.watch("name")?.[0]?.toUpperCase() || ""}${userForm.watch("surname")?.[0]?.toUpperCase() || ""}` ||
                      "..."}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* USER DETAILS FORM */}
              <div className="flex w-full h-full max-h-[512px] max-w-5xl border rounded-lg p-10">
                <Form {...userForm}>
                  <form
                    onSubmit={userForm.handleSubmit(handleUserUpdate)}
                    className="flex flex-col w-full h-full gap-5"
                  >
                    <FormField
                      control={userForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Input
                                {...field}
                                placeholder="..."
                                readOnly={!editableFields.name}
                                className={`${
                                  editableFields.name ? "" : "text-gray-500"
                                }`}
                              />
                              <button
                                className="flex w-6 h-6"
                                onClick={(event) => {
                                  event.preventDefault();
                                  toggleFieldEditable("name");
                                }}
                              >
                                <PencilIcon />
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={userForm.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Input
                                {...field}
                                placeholder="..."
                                readOnly={!editableFields.surname}
                                className={`${
                                  editableFields.surname ? "" : "text-gray-500"
                                }`}
                              />
                              <button
                                className="flex w-6 h-6"
                                onClick={(event) => {
                                  event.preventDefault();
                                  toggleFieldEditable("surname");
                                }}
                              >
                                <PencilIcon />
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={userForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Input
                                {...field}
                                placeholder="..."
                                readOnly={!editableFields.email}
                                className={`${
                                  editableFields.email ? "" : "text-gray-500"
                                }`}
                              />
                              <button
                                className="flex w-6 h-6"
                                onClick={(event) => {
                                  event.preventDefault();
                                  toggleFieldEditable("email");
                                }}
                              >
                                <PencilIcon />
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex w-full h-full justify-center items-center">
                      <Button
                        type="submit"
                        className="bg-blue py-2 hover:bg-blueLight text-white"
                        disabled={!(isUserDirty && !updatingUser)}
                      >
                        {updatingUser ? (
                          <span className="flex items-center gap-2">
                            <Spinner />
                            Updating Profile..
                          </span>
                        ) : (
                          "Update Profile"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>

            {/* UPDATE PASSWORD */}
            <div className="flex w-full h-full justify-between max-h-[512px] max-w-5xl border rounded-lg p-10">
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
                  className="flex flex-col w-full h-full gap-5"
                >
                  <FormField
                    control={passwordForm.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Old Password</FormLabel>
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
                        <FormLabel>New Password</FormLabel>
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
                        <FormLabel>Confirm Password</FormLabel>
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
                  <div className="flex w-full h-full justify-center items-center">
                    <Button
                      type="submit"
                      className="bg-blue py-2 hover:bg-blueLight text-white"
                      disabled={!(isPasswordDirty && !updatingPassword)}
                    >
                      {updatingPassword ? (
                        <span className="flex items-center gap-2">
                          <Spinner />
                          Changing Password..
                        </span>
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
