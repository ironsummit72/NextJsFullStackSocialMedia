import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authRouter from './routes/auth.routes'
import postRouter from './routes/post.routes'
import profileRouter from './routes/profile.routes'
import contentRouter from './routes/content.routes'
import commentRouter from './routes/comment.routes'
import userRouter from './routes/user.routes'
import jwt from 'jsonwebtoken'
import ConnectDB from './utils/connectDb.util'
import cookieParser from 'cookie-parser'
import getCurrentUser from './middleware/CurrentUser.middleware'
import isUserAuthenticated from './middleware/CheckAuth.middleware'
import { ApiResponseType } from './types/ApiResponseType'
const PORT = 5002
const app = express()
app.use(
	cors({
		origin: ['http://localhost:3000'],
		credentials: true,
	}),
)
app.use(cookieParser())
app.use(morgan('tiny'))
ConnectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/auth', authRouter)

app.get('/currentuser', (req, res) => {
	const token = req.cookies.sessionId
	if (token) {
		//@ts-ignore
		jwt.verify(token, process.env.JWT_SECRET!, (err, decodedToken) => {
			if (err) {
				const response: ApiResponseType = { data: null, success: false, statusCode: 401, statusMessage: 'unauthorize access', message: 'unauthorize access', redirect: '/login' }
				res.json(response)
			}
			const response: ApiResponseType = { data: decodedToken, success: true, statusCode: 200, statusMessage: 'success', message: 'current user', redirect: null }
			res.json(response)
		})
	} else {
		const response: ApiResponseType = { data: null, success: false, statusCode: 401, statusMessage: 'unauthorize access', message: 'unauthorize access', redirect: '/login' }
		res.json(response)
	}
})
app.use(getCurrentUser)
app.use(isUserAuthenticated)
app.use(`/profile`, profileRouter)
app.use('/content', contentRouter)
app.use('/post', postRouter)
app.use('/user', userRouter)
app.use('/comment',commentRouter)
app.listen(PORT, () => {
	console.log('listening on port ' + PORT)
})
