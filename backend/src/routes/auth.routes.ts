import {Router} from 'express'
import {handleLogin, handleRegister,logoutUser} from '../controller/auth.controller'
const router = Router()

router.post('/register', handleRegister)
router.post('/login', handleLogin)
router.delete('/logout',logoutUser)

export default router
