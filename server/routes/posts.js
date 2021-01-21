import upload from '../functions/multer.js'
import express from 'express'

const router = express.Router()

import { createPost } from '../controllers/posts.js'

router.post('/createPost', upload.single('post-image'), createPost)
// router.get('/getPosts', getPosts)

export default router