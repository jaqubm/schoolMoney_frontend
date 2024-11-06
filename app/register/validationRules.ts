import { UseFormGetValues } from "react-hook-form";
import { RegisterBody } from "@/app/register/Register.types";

export const getValidationRules = (
  getValues: UseFormGetValues<RegisterBody>,
) => ({
  name: {
    required: "First name is required",
    minLength: {
      value: 2,
      message: "First name must be at least 2 characters long",
    },
    maxLength: {
      value: 20,
      message: "First name cannot exceed 20 characters",
    },
    pattern: {
      value: /^[A-Z][a-zA-Z]*$/,
      message:
        "First name must start with a capital letter and contain only letters",
    },
  },
  surname: {
    required: "Surname is required",
    minLength: {
      value: 2,
      message: "Surname must be at least 2 characters long",
    },
    maxLength: {
      value: 30,
      message: "Surname cannot exceed 30 characters",
    },
    pattern: {
      value: /^[A-Z][a-zA-Z]*$/,
      message:
        "Surname must start with a capital letter and contain only letters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Invalid email format",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
  },
  repeatedPassword: {
    required: "Repeated password is required",
    validate: (value: string) =>
      value === getValues("password") || "Passwords do not match",
  },
  termsAndConditions: {
    required: "You must accept the terms and conditions",
  },
});
