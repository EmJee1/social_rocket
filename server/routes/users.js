import express from 'express'

import {
	createUser,
	loginUser,
	verifyToken,
	createUserByEmail,
	verifyEmail
} from '../controllers/users.js'

const router = express.Router()

router.post('/createUserByEmail', createUserByEmail)
router.post('/verifyEmail', verifyEmail)
router.post('/signup', createUser)
router.post('/login', loginUser)
router.post('/verifyToken', verifyToken)

export default router