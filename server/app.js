import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

const __dirname = path.resolve(path.dirname(''))

app.use('/static', express.static(__dirname + '/uploads'))

app.use('/v1/auth', authRoutes)
app.use('/v1/posts', postRoutes)
app.use('/v1/user', userRoutes)

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	)
	.catch(err => console.log(err.message))

mongoose.set('useFindAndModify', false)