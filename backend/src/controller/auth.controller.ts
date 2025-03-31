import {Request, Response} from 'express'
import ApiResponse from '../utils/ApiResponse.util'
import userModel from '../models/users.model'
import {userLoginWithEmail, userLoginWithUsername, UserRegisterFormSchema} from '../validation/zodValidations'
import {comparePassword} from '../utils/genHashPassword.util'
import {signJwt} from '../utils/JWT.util'
import envs from '../conf/env'

export async function handleRegister(req: Request, res: Response) {
	const {username, email, firstname, lastname, password, confirmpassword} = req.body

	if (username && email && firstname && lastname && password && confirmpassword) {
		const result = UserRegisterFormSchema.safeParse(req.body)
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
					const token = await signJwt({id: dbResponse.id, username: dbResponse.username,fullName:`${dbResponse.firstName} ${dbResponse.lastName}`}, jwtSecret)
					res.cookie('sessionId', token, {httpOnly: true})
					res.status(200).json(new ApiResponse(true, 200, 'success', null, 'login success', ''))
				} else {
					res.status(401).json(new ApiResponse(false, 401, 'unauthorized', null, 'invalid password please try again', null))
				}
			} else {
				res.status(404).json(new ApiResponse(false, 404, 'not found', null, `this username:${username} does not exist`, null))
			}
		}
	} else if (email) {
		const result = userLoginWithEmail.safeParse({email, password})
		if (!result.success) {
			res.status(400).json(new ApiResponse(false, 400, 'bad request', null, result.error, null))
		} else {
			const dbResponse = await userModel.findOne({email})
			if (dbResponse) {
				const isPasswordMatched = await comparePassword(password, dbResponse.password)
				if (isPasswordMatched) {
					const jwtSecret = envs.JWT_SECRET || ''
					const token = await signJwt({id: dbResponse.id, username: dbResponse.username}, jwtSecret)
					res.cookie('sessionId', token, {httpOnly: true})
					res.status(200).json(new ApiResponse(true, 200, 'success', null, 'login success', ''))
				} else {
					res.status(401).json(new ApiResponse(false, 401, 'unauthorized', null, 'invalid password please try again', null))
				}	
			} else {
				res.status(404).json(new ApiResponse(false, 404, 'not found', null, `this email:${email} does not exist`, null))
			}
		}
	}
}
export async function logoutUser(req: Request, res: Response) {
    res.clearCookie('sessionId');
    const response: ApiResponse = {
        data: null,
        message: 'user logout successfully',
        redirect: '/login',
        statusCode: 200,
        statusMessage: 'success',
        success: true

    }
    res.status(200).json(response)
}