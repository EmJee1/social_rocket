import {
	nodemailerTransport,
	signupEmailVerificationOptions,
	registrationEmail,
} from '../functions/nodemailer.js'
import { apiBodyResponse, isValidUsername } from '../functions/misc.js'
import * as EmailValidator from 'email-validator'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JSON_WEBTOKEN_SECRET = process.env.JSON_WEBTOKEN_SECRET

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
		userQuery = await User.findOne({
			$or: [{ userName }, { email: userName }],
		}).exec()
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
	const token = jwt.sign({ userId: userQuery._id }, JSON_WEBTOKEN_SECRET, {
		expiresIn: '1h',
	})

	res
		.status(200)
		.json({
			success: true,
			message: 'User verified successfully',
			token,
			userName: userQuery.userName,
		})
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
			{ userId: decoded.userId },
			JSON_WEBTOKEN_SECRET,
			{
				expiresIn: '1h',
			}
		)
	}

	res.status(200).json(response)
}

export const createUserByEmail = async (req, res) => {
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
	}

	// check if a user is already in the database with that email
	const emailQuery = await User.findOne({ email }).exec()

	if (!emailQuery) {
		// create a new user is there is no with that email
		const verificationCode = Math.floor(100000 + Math.random() * 900000)

		const userDetails = { email, verificationCode }
		const newUser = new User(userDetails)

		// save a new user to the database with the email and verification code
		try {
			await newUser.save()
			res
				.status(201)
				.json(
					apiBodyResponse(
						true,
						'Please check your inbox for the verification code'
					)
				)
		} catch (err) {
			res.status(500).json({ success: false, message: err.message })
		}
		return
	}

	if (emailQuery.password) {
		// a verified user already exists with that email address
		res
			.status(409)
			.json(
				apiBodyResponse(false, 'A user with that email address already exists')
			)
		return
	}

	// a user already exists, but is not verified yet
	const verificationCode = Math.floor(100000 + Math.random() * 900000)
	try {
		await User.updateOne({ _id: emailQuery._id }, { verificationCode })
		nodemailerTransport.sendMail(
			signupEmailVerificationOptions(email, verificationCode),
			(err, info) => {
				if (err) {
					res.status(500).json(apiBodyResponse(false, err))
				} else {
					res
						.status(201)
						.json(
							apiBodyResponse(
								true,
								'A verification e-mail has been sent, please check your inbox'
							)
						)
				}
			}
		)
	} catch (err) {
		res.status(500).json({ success: false, message: err.message })
	}
}

export const verifyEmail = async (req, res) => {
	if (!req.body) {
		res.status(400).json(apiBodyResponse(false, 'No readable body received'))
		return
	}

	const verificationCode = req.body.verificationCode
	const email = req.body.email
	if (!email || !EmailValidator.validate(email)) {
		res.status(400).json(apiBodyResponse(false, 'Invalid email address'))
		return
	}

	let userQuery
	try {
		userQuery = await User.findOne({ email }).exec()
	} catch (err) {
		res.status(500).json(apiBodyResponse(false, err.message))
		return
	}

	if (!userQuery) {
		res
			.status(401)
			.json(apiBodyResponse(false, 'No user with that email address found'))
		return
	}

	// check if user is already verified
	if (userQuery.password) {
		res
			.status(400)
			.json(apiBodyResponse(false, 'User is already verified, please log in'))
		return
	}

	// check if the supplied verification code does not match the code in the DB
	if (verificationCode !== userQuery.verificationCode) {
		res
			.status(401)
			.json(apiBodyResponse(false, 'The entered verification code is invalid'))
		return
	}

	// user successfully verified their email address
	// update the database
	try {
		await User.updateOne({ _id: userQuery._id }, { verifiedEmail: true }).exec()
	} catch (err) {
		res
			.status(500)
			.json(
				apiBodyResponse(
					false,
					'Something unexpected went wrong, please try again'
				)
			)
		return
	}

	// sign a new jwt
	const token = jwt.sign({ userId: userQuery._id }, JSON_WEBTOKEN_SECRET, {
		expiresIn: '1h',
	})

	res
		.status(200)
		.json({ success: true, message: 'Email verified successfully', token })
}

export const finishUserSignup = async (req, res) => {
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

	// check if the provided jwt is valid
	let decoded
	try {
		decoded = jwt.verify(token, JSON_WEBTOKEN_SECRET)
	} catch (err) {
		res
			.status(401)
			.json(apiBodyResponse(false, 'The received token is not valid'))
		return
	}

	// check if the token matches the email address (to prevent a hijacked token for changing others data)
	const email = req.body.email
	let checkTokenWithEmailQuery
	try {
		checkTokenWithEmailQuery = await User.findOne({
			_id: decoded.userId,
			email,
		})
	} catch (err) {
		res
			.status(500)
			.json(
				apiBodyResponse(
					false,
					'Something unexpected went wrong, please try again'
				)
			)
		return
	}
	if (!checkTokenWithEmailQuery) {
		res
			.status(401)
			.json(
				apiBodyResponse(
					false,
					'The token does not match with the supplied email address'
				)
			)
		return
	}
	// check if the user already has a password
	// this means that he can login, so he should not be able to overwrite the password
	if (checkTokenWithEmailQuery.password) {
		res
			.status(401)
			.json(
				apiBodyResponse(
					false,
					'This user already has a password, please log in'
				)
			)
		return
	}

	const newUserData = {}

	const password = req.body.password
	if (!password || password.length <= 6) {
		res
			.status(400)
			.json(
				apiBodyResponse(
					false,
					'Password needs a length of at least 7 characters'
				)
			)
		return
	}

	// encrypt the password
	const hashed = bcrypt.hashSync(password, 10)
	newUserData.password = hashed

	// check if username is valid
	const userName = req.body.userName
	if (!userName || userName.length <= 4 || !isValidUsername(userName)) {
		res
			.status(400)
			.json(
				apiBodyResponse(
					false,
					'Username needs at least 5 characters and may only contain letters, numbers and underscores'
				)
			)
		return
	}
	// check if username is already taken
	let userQuery
	try {
		userQuery = await User.findOne({ userName }).exec()
	} catch (err) {
		res
			.status(500)
			.json(
				apiBodyResponse(
					false,
					'Something unexpected went wrong, please try again'
				)
			)
		return
	}
	if (userQuery) {
		res
			.status(409)
			.json(
				apiBodyResponse(
					false,
					'A user with that username already exists, please choose another'
				)
			)
		return
	}
	newUserData.userName = userName

	// everything validated successfully, let's store the new data in the DB
	try {
		await User.updateOne({ _id: decoded.userId }, newUserData)
	} catch (err) {
		res
			.status(500)
			.json(
				apiBodyResponse(
					false,
					'Something unexpected went wrong, please try again'
				)
			)
		return
	}

	// send a success mail
	nodemailerTransport.sendMail(
		registrationEmail(email, newUserData.userName),
		(err, info) => {
			res
				.status(201)
				.json(
					apiBodyResponse(true, 'User details have been added successfully')
				)
		}
	)
}
