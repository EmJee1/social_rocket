import {
	updateProfilePicture,
	getUserInfoByNameAndToken,
} from '../controllers/user.js'
import upload from '../functions/multer.js'
import express from 'express'

const router = express.Router()

router.post(
	'/updateProfilePicture',
	upload.single('profile-picture'),
	updateProfilePicture
)
router.post('/getUserInfoByNameAndToken', getUserInfoByNameAndToken)

export default router