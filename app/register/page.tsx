"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import React from "react";
import { Header } from "@/components/Header";
import { RegisterBody } from "@/app/register/Register.types";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getValidationRules } from "@/app/register/validationRules";
import { clsx } from "clsx";

export default function Register() {
  const router = useRouter();
  const form = useForm<RegisterBody>({
    defaultValues: {
      email: "",
      password: "",
      repeatedPassword: "",
      name: "",
      surname: "",
      termsAndConditions: false,
    },
  });

  const validationRules = getValidationRules(form.getValues);
  const {
    register,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<RegisterBody> = async (data) => {
    // const { ...registerFields } = data;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("email", register("email", validationRules.email));
  console.log(
    "termsAndConditions",
    register("termsAndConditions", validationRules.termsAndConditions),
  );

  return (
    <div className="relative h-screen w-screen">
      <div className="flex flex-row h-screen w-full">
        <div className="relative flex-1 flex items-center justify-start flex-col text-white p-10">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/assets/mama_z_corka.jpeg')" }}
          >
            <Header />
          </div>
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="flex flex-col items-center justify-start mt-32">
            <h1 className="relative z-10 text-5xl font-bold mb-2">
              Streamline School
            </h1>
            <h1 className="relative z-10 text-5xl font-bold">Fundraising</h1>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center flex-col gap-10">
          <div className="flex flex-col justify-center gap-4">
            <h3 className="font-bold text-2xl">Create an account</h3>
            <p className="flex flex-row gap-1 font-poppins text-xs mx-auto">
              Already have an account
              <a href="/login" className="text-accent font-bold">
                Sign in
              </a>
            </p>
          </div>

          <div className="w-[395px] flex flex-col justify-center gap-7">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {errors.name && (
                <p className="text-destructive text-xs mb-1">
                  {errors.name.message}
                </p>
              )}
              <Input
                className="shadow mb-5"
                placeholder="First name"
                {...register("name", validationRules.name)}
              />

              {errors.surname && (
                <p className="text-destructive text-xs mb-1">
                  {errors.surname.message}
                </p>
              )}
              <Input
                className="shadow mb-5"
                placeholder="Last name"
                {...form.register("surname", validationRules.surname)}
              />

              {errors.email && (
                <p className="text-destructive text-xs mb-1">
                  {errors.email.message}
                </p>
              )}
              <Input
                className="shadow mb-5"
                type="email"
                placeholder="Email"
                {...register("email", validationRules.email)}
              />

              {errors.password && (
                <p className="text-destructive text-xs mb-1">
                  {errors.password.message}
                </p>
              )}
              <Input
                className="shadow mb-5"
                type="password"
                placeholder="Password"
                {...register("password", validationRules.password)}
              />

              {errors.repeatedPassword && (
                <p className="text-destructive text-xs mb-1">
                  {errors.repeatedPassword.message}
                </p>
              )}
              <Input
                className="shadow mb-5"
                type="password"
                placeholder="Repeat password"
                {...register(
                  "repeatedPassword",
                  validationRules.repeatedPassword,
                )}
              />

              {errors.termsAndConditions && (
                <p className="flex items-center gap-1 w-fit mx-auto text-destructive text-xs mb-1">
                  {errors.termsAndConditions.message}
                </p>
              )}
              <label className="flex items-center gap-1 text-xs w-fit mx-auto">
                <Controller
                  control={form.control}
                  name="termsAndConditions"
                  rules={validationRules.termsAndConditions}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      className="border border-grayLight"
                      checked={value}
                      // onChange={onChange}
                      onClick={onChange}

                      // onClick={}
                      //    {...register(
                      //        "termsAndConditions",
                      //        validationRules.termsAndConditions,
                      //    )}
                    />
                  )}
                />
                I accept the terms and conditions and privacy policy
              </label>

              <div className="flex items-center gap-1 w-fit mx-auto mt-5">
                <Button
                  type="submit"
                  variant="default"
                  className={clsx(
                    "font-poppins rounded-2xl font-semibold bg-blue text-primary",
                    "hover:bg-blueLight",
                  )}
                >
                  Get Started
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
