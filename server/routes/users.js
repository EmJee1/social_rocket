import express from 'express'

import {
	loginUser,
	verifyToken,
	createUserByEmail,
	verifyEmail,
	finishUserSignup
} from '../controllers/users.js'

const router = express.Router()

router.post('/createUserByEmail', createUserByEmail)
router.post('/verifyEmail', verifyEmail)
router.post('/finishUserSignup', finishUserSignup)
router.post('/login', loginUser)
router.post('/verifyToken', verifyToken)

export default router