import { z } from "zod"

export const loginWithUsername = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(4, { message: 'Password must be at least 4 characters' })
})
export const loginWithEmail = z.object({
    email: z.string().email({ message: 'please enter a valid email address' }),
    password: z.string().min(4, { message: 'Password must be at least 4 characters' })
})
export const RegisterFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "username should atleast be 3 characters long" })
      .trim(),
    email: z.string().email({ message: "Invalid email address" }).trim(),
    firstname: z
      .string()
      .min(3, { message: "firstname must be atleast 3 characters long" })
      .max(30, { message: "cannot be more than 30 characters long" })
      .trim(),
    lastname: z
      .string()
      .min(3, { message: "lastname must be atleast 3 characters long" })
      .max(30, { message: "cannot be more than 30 characters long" })
      .trim(),
    password: z
      .string()
      .min(1, { message: "please enter your password" })
      .trim(),
    confirmpassword: z
      .string()
      .min(1, { message: "please confirm your password" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "confirm password  not matching with password",
    path:['confirmpassword']
  });

  export const PostFormSchema=z.object({
    caption:z.string().min(1,{message:`please enter a caption `,}).trim()
  })