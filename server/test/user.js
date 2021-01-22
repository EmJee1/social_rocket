import User from '../models/User.js'
import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv'
import chai from 'chai'

dotenv.config()

const assert = chai.assert
const { CONNECTION_URL } = process.env

const connectDatabase = () =>
	mongoose.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})

describe('Test MongoDB connection', () => {
	it('Connect to the database', done => {
		connectDatabase()

		mongoose.connection.once('open', () => {
			done()
		})

		mongoose.connection.once('error', err => {
			done(err)
		})
	})

	it('Close database connection', done => {
		mongoose.disconnect()

		mongoose.connection.once('disconnected', () => {
			done()
		})

		mongoose.connection.once('error', err => {
			done(err)
		})
	})
})

describe('Test authentication endpoints', () => {
	it('Create a new user', async () => {
        connectDatabase()
		const userDetails = {
			userName: 'SomeTestUser',
			password: 'someTestPassword',
			email: 'test@test.test',
        }
        const newUser = new User(userDetails)
        try {
            await newUser.save()
            done()
        } catch (err) {
            done(err)
        }
	})
})