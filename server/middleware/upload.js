import multer from 'multer'
import util from 'util'

const maxSize = 2 * 1024 * 1024

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '/uploads/images/posts/')
	},
	filename: (req, file, cb) => {
		console.log(file.originalname)
		cb(null, file.originalname)
	},
})

const uploadFile = multer({
	storage,
	limits: { fileSize: maxSize },
}).single('file')

const uploadFileMiddleware = util.promisify(uploadFile)

export default uploadFileMiddleware