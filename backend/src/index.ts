import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authRouter from './routes/auth.route'
import postRouter from './routes/post.route'

import ConnectDB from './utils/connectDb.util'
import cookieParser from 'cookie-parser'
import getCurrentUser from './middleware/CurrentUser.middleware'
import isUserAuthenticated from './middleware/CheckAuth.middleware'
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
app.use(express.urlencoded({extended: true}))

//routes
app.use('/auth', authRouter)
app.use(getCurrentUser)
app.use(isUserAuthenticated)
app.use('/post',postRouter)

app.listen(PORT, () => {
	console.log('listening on port ' + PORT)
})
