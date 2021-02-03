import mongoose from 'mongoose'
const Schema = mongoose.Schema

// create the comment schema
const CommentSchema = new Schema({
	userId: String,
	text: String,
	createdAt: {
		type: Date,
		default: new Date(),
	},
})

// create the post schema
const PostSchema = new Schema({
	caption: String,
	image: String,
	author: String,
	authorDetails: Object,
	likes: {
		type: [],
		default: [],
	},
	comments: {
		type: [CommentSchema],
		default: [],
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
})

const Post = mongoose.model('Post', PostSchema)

export default Post