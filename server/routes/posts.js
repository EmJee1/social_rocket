import express from 'express'

const router = express.Router()

import { createPost } from '../controllers/posts.js'

router.post('/uploadTest')
router.post('/createPost', createPost)

export default router