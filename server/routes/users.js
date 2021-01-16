import express from 'express'

import { createUser, loginUser, verifyToken } from '../controllers/users.js'

const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser)
router.post('/verifyToken', verifyToken)

export default router