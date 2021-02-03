import upload from '../functions/multer.js'
import express from 'express'

const router = express.Router()

import { createPost, getPosts, likePost } from '../controllers/posts.js'

router.post('/createPost', upload.single('post-image'), createPost)
router.get('/getPosts', getPosts)
router.post('/likePost', likePost)

export default router