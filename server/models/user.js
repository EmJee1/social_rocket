import mongoose from 'mongoose'
const Schema = mongoose.Schema

// create the user schema
const UserSchema = new Schema({
	userName: String,
	email: String,
	password: String,
	verifiedEmail: {
		type: Boolean,
		default: false,
	},
	verificationCode: String,
	profilePicture: {
		type: String,
		default: 'http://localhost:5000/static/posts/default-user.jpg',
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
})

const User = mongoose.model('User', UserSchema)

export default User