import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
	userName: String,
	email: String,
	password: String,
	verifiedEmail: {
		type: Boolean,
		default: false,
	},
	verificationCode: String,
	createdAt: {
		type: Date,
		default: new Date(),
	},
})

const User = mongoose.model('User', userSchema)

export default User