import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/posts')
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		)
	},
})

const upload = multer({
	fileFilter: (req, file, callback) => {
		const ext = path.extname(file.originalname)
		if (!['.png', '.jpg', '.gif', '.jpeg', '.webp'].includes(ext)) {
			return callback(new Error('Only images are allowed'), false)
		}
		callback(null, true)
	},
	storage,
	limits: { fileSize: 3 * 1024 * 1024 },
})

export default upload