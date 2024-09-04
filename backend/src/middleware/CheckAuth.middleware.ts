import {NextFunction, Request, Response} from 'express'
import jsonwebtoken from 'jsonwebtoken'
import envs from '../conf/env'
import ApiResponse from '../utils/ApiResponse'
export default function isUserAuthenticated(req: Request, res: Response, next: NextFunction) {
	const token = req.cookies?.sessionId
	const jwtSecret = envs.JWT_SECRET || ''
	console.log(jwtSecret, 'jwt secret')
	if (token) {
		// @ts-ignore
		jsonwebtoken.verify(token, jwtSecret, (err, _) => {
			if (err) {
				console.log(err)
				res.status(401).json(new ApiResponse(false, 401, 'unauthorized', null, 'you are not authorized please login', ''))
			} else {
				next()
			}
		})
	} else {
		res.status(401).json(new ApiResponse(false, 401, 'unauthorized', null, 'you are not authorized please login', ''))
	}
}
