import mongoose from 'mongoose'
const Schema = mongoose.Schema

// create the post schema
const PostSchema = new Schema({
    caption: String,
    image: String,
    author: String,
	likes: {
		type: [],
		default: [],
	},
	comments: {
		type: [],
		default: [],
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
})

const Post = mongoose.model('Post', PostSchema)

export default Post