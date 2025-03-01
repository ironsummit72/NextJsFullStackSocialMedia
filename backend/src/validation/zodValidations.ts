import {z} from 'zod'
export const UserRegisterFormSchema = z
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


export const userLoginWithUsername = z.object({
	username: z.string().min(3, 'username must be at least 5 characters').trim(),
	password: z.string().min(4, 'password must be at least 4 characters'),
})
export const userLoginWithEmail = z.object({
	email: z.string().email('Please Enter Your valid email address').trim(),
	password: z.string().min(4, 'password must be at least 4 characters'),
})
