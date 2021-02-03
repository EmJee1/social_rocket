import { apiBodyResponse } from '../functions/misc.js'
import User from '../models/User.js'
import Post from '../models/Post.js'
import jwt from 'jsonwebtoken'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

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

	// resize and save image using sharp
	await sharp(req.file.path)
		.resize(500, 500)
		.jpeg({ quality: 70 })
		.toFile(path.resolve(req.file.destination, 'resized', req.file.filename))
	fs.unlinkSync(req.file.path)

	let filePath =
		'http://' +
		req.get('host') +
		'/static/' +
		req.file.path.replace('uploads\\', '').replaceAll('\\', '/')
	filePath = filePath.replace('/posts/', '/posts/resized/')

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
		posts = await Post.find().limit(10).sort({ createdAt: -1 }).exec()
	} catch (err) {
		res
			.status(500)
			.json(apiBodyResponse(false, 'Unexpected error, please try again'))
		return
	}

	// get the author information by author id
	for (let i = 0; i < posts.length; i++) {
		let data
		try {
			data = await User.findOne({ _id: posts[i].author })
				.select('userName profilePicture')
				.exec()
		} catch (err) {
			res
				.status(500)
				.json(apiBodyResponse(false, 'Unexpected error, please try again'))
			return
		}
		posts[i].authorDetails = {
			userName: data.userName,
			profilePicture: data.profilePicture,
		}
	}

	res
		.status(200)
		.json({ success: true, message: 'Requested posts successfully', posts })
}

export const likePost = async (req, res) => {
	if (!req.body) {
		res.status(400).json(apiBodyResponse(false, 'No readable body received'))
		return
	}

	const { token, userName, postId } = req.body

	if (!postId || !userName || !token) {
		res
			.status(401)
			.json(apiBodyResponse(false, 'Not all required fields were received'))
		return
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

	let post
	try {
		post = await Post.findOne({ _id: postId }).exec()
	} catch (err) {
		res
			.status(500)
			.json(apiBodyResponse(false, 'Something went wrong, please try again'))
		return
	}

	if (!post) {
		res.status(400).json(apiBodyResponse(false, 'That post does not exist'))
		return
	}

	let liked = post.likes.filter(like => like === decoded.userId)
	liked = liked.length > 0 ? true : false

	let newLikes = post.likes
	if (liked) {
		newLikes = newLikes.filter(like => like !== decoded.userId)
	} else {
		newLikes.push(decoded.userId)
	}

	console.log(newLikes)

	try {
		await Post.updateOne({ _id: postId }, { likes: newLikes }).exec()
	} catch (err) {
		res
			.status(500)
			.json(apiBodyResponse(false, 'Something went wrong, please try again'))
		return
	}

	res
		.status(200)
		.json({ success: true, message: 'Succesfully liked / disliked the image' })
}