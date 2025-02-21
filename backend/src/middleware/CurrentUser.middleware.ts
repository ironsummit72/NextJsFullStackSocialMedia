import {Request, Response, NextFunction} from 'express'
import jswonwebtoken from 'jsonwebtoken'
import envs from '../conf/env'


export default function getCurrentUser(req: Request, _: Response, next: NextFunction) {
	const token = req.cookies?.sessionId
	

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
