import {Request, Response} from 'express'
import ApiResponse from '../utils/ApiResponse'
import userModel from '../models/users.model'
import {userLoginWithUsername, UserRegisterSchema} from '../validation/zodValidations'
import {comparePassword} from '../utils/genHashPassword'
import {signJwt} from '../utils/JWT'
import envs from '../conf/env'

export async function handleRegister(req: Request, res: Response) {
	const {username, email, firstname, lastname, password, cpassword} = req.body

	if (username && email && firstname && lastname && password && cpassword) {
		const result = UserRegisterSchema.safeParse(req.body)
		if (!result.success) {
			console.error(result.error)
			res.status(400).json(new ApiResponse(false, 400, 'bad request', null, result.error, null))
		} else {
			const dbResponse = await userModel.create({username, email, firstName: firstname, lastName: lastname, password})
			return res.status(200).json(new ApiResponse(true, 200, 'success', dbResponse, 'user registered successfull', null))
		}
	} else {
		return res
			.status(400)
			.json(
				new ApiResponse(
					false,
					400,
					'something went wrong',
					null,
					'either username email firstname lastnane password cpassword missing',
					null,
				),
			)
	}
}
export async function handleLogin(req: Request, res: Response) {
	const {username, password, email} = req.body
	if (username) {
		const result = userLoginWithUsername.safeParse({username, password})
		if (!result.success) {
			res.status(400).json(new ApiResponse(false, 400, 'bad request', null, result.error, null))
		} else {
			const dbResponse = await userModel.findOne({username})
			if (dbResponse) {
				const isPasswordMatched = await comparePassword(password, dbResponse.password)
				if (isPasswordMatched) {
					const jwtSecret = envs.JWT_SECRET || ''
					const token = await signJwt({id: dbResponse.id, username: dbResponse.username}, jwtSecret)
					res.cookie('sessionId', token, {httpOnly: true})
					res.status(200).json(new ApiResponse(true, 200, 'success', null, 'login success', ''))
				}
			}
		}
	}
}
