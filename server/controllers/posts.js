import { apiBodyResponse } from '../functions/misc.js'

const { JSON_WEBTOKEN_SECRET } = process.env

export const uploadTest = async (req, res) => {
    
}

export const createPost = async (req, res) => {
	if (!req.body) {
		res.status(400).json(apiBodyResponse(false, 'No readable body received'))
	}

	const { token, caption, image } = req.body
}