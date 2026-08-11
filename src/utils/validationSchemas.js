import * as yup from "yup";

const errors = {
  required: "Required field",
  minName: "Minimum 2 characters",
  minPassword: "Minimum 7 characters",
  email: "Invalid email",
  phone: "Incorrect phone number",
};

export const registerSchema = yup.object({
  name: yup.string().trim().min(2, errors.minName).required(errors.required),

  email: yup.string().trim().email(errors.email).required(errors.required),

  password: yup.string().min(7, errors.minPassword).required(errors.required),
});

export const loginSchema = yup.object({
  email: yup.string().trim().email(errors.email).required(errors.required),

  password: yup.string().min(7, errors.minPassword).required(errors.required),
});

export const bookingSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, errors.minName)
    .required(errors.required),

  email: yup.string().trim().email(errors.email).required(errors.required),

  phone: yup
    .string()
    .trim()
    .matches(/^\+?[0-9\s-]{7,15}$/, errors.phone)
    .required(errors.required),

  reason: yup.string().trim().required(errors.required),
});
