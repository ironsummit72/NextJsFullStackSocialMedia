import {z} from 'zod'
export const UserRegisterSchema = z
	.object({
		username: z
			.string()
			.min(3, 'Username must be at least 3 characters')
			.max(20, 'username cannot be more than 20 characters')
			.trim(),
		email: z.string().email('Invalid email format. please enter a valid email address').trim(),
		firstname: z.string().min(3, 'Username must be at least 3 characters').trim(),
		lastname: z.string().min(3, 'Username must be at least 3 characters').trim(),
		password: z.string().min(5, 'Password must be at least 5 characters').trim(),
		cpassword: z.string(),
	})
	.refine((data) => data.password === data.cpassword, {
		message: "password not matching ",
	  });
	

export const userLoginWithUsername = z.object({
	username: z.string().min(3, 'username must be at least 5 characters').trim(),
	password: z.string().min(5, 'password must be at least 5 characters'),
})
export const userLoginWithEmail = z.object({
	email: z.string().email('Please Enter Your valid email address').trim(),
	password: z.string().min(5, 'password must be at least 5 characters'),
})
