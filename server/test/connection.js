import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const { CONNECTION_URL } = process.env

mongoose.connect(CONNECTION_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
    console.log('MongoDB connected');
})