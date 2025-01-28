"use client";

import { useUpdateUser, useUserData } from "@/queries/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/Header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useUpdatePassword } from "@/queries/auth";
import { updatePasswordSchema, updateUserSchema } from "./profileValidation";

export default function ProfilePage() {
  const { data: userData, isLoading: loadingUser } = useUserData();
  const { mutate: updateUser, isLoading: updatingUser } = useUpdateUser();
  const { mutate: updatePassword } = useUpdatePassword();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: userData?.email || "",
      name: userData?.name || "",
      surname: userData?.surname || "",
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

  const passwordForm = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

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

      <div className="flex w-full h-full">
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full h-full px-16 py-10">
          <div className="flex w-full h-full min-h-[91px] max-h-[91px] gap-[30px] items-center">
            <h2 className="text-4xl font-normal line-">Your profile</h2>
          </div>

          <div>
            <div className="flex gap-10">
              {/* AVATAR */}
              <div className="flex flex-col items-center justify-center w-full max-w-[512px] max-h-[512px] border rounded-lg">
                <Avatar className="w-52 h-52">
                  <AvatarFallback className="text-4xl">
                    {`${form.watch("name")?.[0]?.toUpperCase() || ""}${form.watch("surname")?.[0]?.toUpperCase() || ""}` ||
                      "..."}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* USER DETAILS FORM */}
              <div className="w-full h-full max-h-[512px] max-w-5xl border rounded-lg p-10">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleUserUpdate)}
                    className="flex flex-col gap-5"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your last name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between mt-8">
                      <Button
                        type="submit"
                        className="bg-blue text-white w-40"
                        disabled={updatingUser}
                      >
                        {updatingUser ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        className="bg-red text-white w-40"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            {/* UPDATE PASSWORD */}
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
