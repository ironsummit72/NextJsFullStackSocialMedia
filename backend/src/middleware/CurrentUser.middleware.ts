import {Request, Response, NextFunction} from 'express'
import jswonwebtoken from 'jsonwebtoken'
import envs from '../conf/env'
import {CustomRequest} from '../types/ApiResponseType'

export default function getCurrentUser(req: CustomRequest, _: Response, next: NextFunction) {
	const token = req.cookies?.sessionId
	const token2 = req.cookies

	const secret = envs.JWT_SECRET || ''
	if (token) {
		// @ts-ignore
		jswonwebtoken.verify(token, secret, (err, decodedToken) => {
			if (err) {
				next(err)
			} else {
				req.user = decodedToken
				next()
			}
		})
	} else {
		return next()
	}
}
