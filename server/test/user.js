import User from '../models/User.js'
import chai from 'chai'

const assert = chai.assert

describe('MongoDB connection', () => {
    
})

// describe('Users', () => {
// 	it('Create a new user', async done => {
// 		const userDetails = {
// 			userName: 'SomeTestUser',
// 			password: 'someTestPassword',
// 			email: 'test@test.test',
// 			verificationCode: 123456,
//         }
//         const user = new User(userDetails)
//         const res = await user.save()
//         console.log(res)
//         assert.isTrue(user.userName === 'SomeTestUser')
//         done()
// 	})
// })