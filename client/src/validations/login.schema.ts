import * as yup from "yup";

export const LoginSchema = yup
  .object({
    username: yup
      .string()
      .required()
      .min(6, "Username must be at least 6 characters")
      .max(30, "Username cannot exceed 30 characters"),
    password: yup
      .string()
      .required()
      .min(6, "Password must be at least 6 characters"),
  })
  .required("Please fill in all fields!");
