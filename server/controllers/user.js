import { apiBodyResponse } from '../functions/misc.js'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const { JSON_WEBTOKEN_SECRET } = process.env

export const updateProfilePicture = async (req, res) => {
	if (!req.body) {
		res.status(400).json(apiBodyResponse(false, 'No readable body received'))
		return
	}

	if (!req.file) {
		res
			.status(400)
			.json(apiBodyResponse(false, 'Did not receive a valid image'))
		return
	}

	const { token, userName } = req.body

	// resize and save image using sharp
	await sharp(req.file.path)
		.resize(250, 250)
		.jpeg({ quality: 90 })
		.toFile(path.resolve(req.file.destination, 'resized', req.file.filename))
	fs.unlinkSync(req.file.path)

	let filePath =
		'http://' +
		req.get('host') +
		'/static/' +
		req.file.path.replace('uploads\\', '').replaceAll('\\', '/')
	filePath = filePath.replace('/posts/', '/posts/resized/')

	if (!token || !userName) {
		res
			.status(401)
			.json(apiBodyResponse(false, 'Not all required fields were received'))
	}

	let decoded
	try {
		decoded = jwt.verify(token, JSON_WEBTOKEN_SECRET)
	} catch (err) {
		res
			.status(401)
			.json(
				apiBodyResponse(false, 'The token is not valid, please log in again')
			)
		return
	}

	let userQuery
	try {
		userQuery = await User.findOne({ _id: decoded.userId, userName })
	} catch (err) {
		res
			.status(500)
			.json(apiBodyResponse(false, 'Something went wrong, please try again'))
		return
	}

	if (!userQuery) {
		res
			.status(401)
			.json(
				apiBodyResponse(false, 'The token is not valid, please log in again')
			)
		return
	}

	try {
		await User.updateOne(
			{ _id: userQuery._id },
			{ profilePicture: filePath }
		).exec()
	} catch (err) {
		res
			.status(500)
			.json(apiBodyResponse(false, 'Something went wrong, please try again'))
		return
	}

	const newToken = jwt.sign({ userId: decoded.userId }, JSON_WEBTOKEN_SECRET, {
		expiresIn: '1h',
	})

	res.status(201).json({
		success: true,
		token: newToken,
		message: 'Profile picture changed successfully',
	})
}