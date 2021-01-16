import { apiBodyResponse } from '../functions/response.js'
import * as EmailValidator from 'email-validator'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const JSON_WEBTOKEN_SECRET = process.env.JSON_WEBTOKEN_SECRET

export const createUser = async (req, res) => {
	if (!req.body) {
		res.status(400).json(apiBodyResponse(false, 'No readable body received'))
		return
	}

	const email = req.body.email
	if (!email || !EmailValidator.validate(email)) {
		res
			.status(422)
			.json(apiBodyResponse(false, 'The entered email address is not valid'))
		return
	} else {
		const emailQuery = await User.findOne({ email }).exec()
		if (emailQuery) {
			res
				.status(409)
				.json(apiBodyResponse(false, 'A user with that email already exists'))
			return
		}
	}

	const userName = req.body.userName
	if (!userName) {
		res
			.status(422)
			.json(apiBodyResponse(false, 'The entered username is not valid'))
		return
	} else {
		const userNameQuery = await User.findOne({ userName }).exec()
		if (userNameQuery) {
			res
				.status(409)
				.json(apiBodyResponse(false, 'A user with that name already exists'))
			return
		}
	}

	const password = req.body.password
	let hashed
	if (!password) {
		res
			.status(422)
			.json(apiBodyResponse(false, 'The entered password is not valid'))
		return
	} else {
		if (password.length <= 6) {
			res
				.status(422)
				.json(apiBodyResponse(false, 'A password needs at least 6 charactars'))
			return
		}

		hashed = bcrypt.hashSync(password, 10)
	}

	const userDetails = { userName, email, password: hashed }
	const newUser = new User(userDetails)

	try {
		await newUser.save()
		res
			.status(201)
			.json({ success: true, message: 'The user signup was successful!' })
	} catch (err) {
		res.status(500).json({ success: false, message: err.message })
	}
}

export const loginUser = async (req, res) => {
	if (!req.body) {
		res.status(400).json(apiBodyResponse(false, 'No readable body received'))
		return
	}

	const userName = req.body.userName
	let userQuery
	if (!userName) {
		res
			.status(422)
			.json(apiBodyResponse(false, 'The entered username is not valid'))
		return
	} else {
		userQuery = await User.findOne({ userName }).exec()
		if (!userQuery) {
			res
				.status(401)
				.json(apiBodyResponse(false, 'Username or password incorrect'))
			return
		}
	}

	const password = req.body.password
	if (!password) {
		res
			.status(422)
			.json(apiBodyResponse(false, 'The entered password is not valid'))
		return
	} else {
		if (!bcrypt.compareSync(password, userQuery.password)) {
			res
				.status(401)
				.json(apiBodyResponse(false, 'Username or password incorrect'))
			return
		}
	}

	// user is verified
	const token = jwt.sign({ userName }, JSON_WEBTOKEN_SECRET, {
		expiresIn: '1h',
	})

	res
		.status(200)
		.json({ success: true, message: 'User verified successfully', token })
}

export const verifyToken = async (req, res) => {
	if (!req.body) {
		res.status(400).json(apiBodyResponse(false, 'No readable body received'))
		return
	}

	const token = req.body.token
	if (!token) {
		res
			.status(422)
			.json(apiBodyResponse(false, 'The received token is not valid'))
		return
	}

	let decoded
	try {
		decoded = jwt.verify(token, JSON_WEBTOKEN_SECRET)
	} catch (err) {
		res
			.status(500)
			.json(apiBodyResponse(false, 'The received token is not valid'))
		return
	}

	const signNewToken = req.body.signNewToken

	const response = {
		success: true,
		message: 'Validation succeeded successfully',
	}

	if (signNewToken) {
		response.token = jwt.sign(
			{ userName: decoded.userName },
			JSON_WEBTOKEN_SECRET,
			{
				expiresIn: '1h',
			}
		)
	}

	res.status(200).json(response)
}