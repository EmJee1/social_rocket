import { apiBodyResponse } from '../functions/misc.js'
import User from '../models/User.js'
import Post from '../models/Post.js'
import jwt from 'jsonwebtoken'

const { JSON_WEBTOKEN_SECRET } = process.env

export const createPost = async (req, res) => {
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

	const filePath =
		'http://' +
		req.get('host') +
		'/static/' +
		req.file.path.replace('uploads\\', '').replaceAll('\\', '/')

	const { token, caption, userName } = req.body
	if (!caption || !userName || !token) {
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

	const postDetails = { caption, image: filePath, author: decoded.userId }
	const newPost = new Post(postDetails)
	try {
		await newPost.save()
	} catch (err) {
		console.error(err)
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
		message: 'Post created successfully',
		token: newToken,
	})
}

export const getPosts = async (req, res) => {
	let posts
	try {
		posts = await Post.find().limit(10).exec()
	} catch (err) {
		res
			.status(500)
			.json(apiBodyResponse(false, 'Unexpected error, please try again'))
	}

	// get the author information by author id
	for (let i = 0; i < posts.length; i++) {
		let data
		try {
			data = await User.findOne({ _id: posts[i].author })
				.select('userName')
				.exec()
		} catch (err) {
			res
				.status(500)
				.json(apiBodyResponse(false, 'Unexpected error, please try again'))
		}
		posts[i].author = data.userName
	}

	res
		.status(200)
		.json({ success: true, message: 'Requested posts successfully', posts })
}