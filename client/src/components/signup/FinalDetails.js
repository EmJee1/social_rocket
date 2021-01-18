import { finishUserSignup } from '../../functions/auth.api'
import { isValidUsername, getJWT } from '../../functions/misc'
import { useState } from 'react'

const VerifyEmail = ({ setFormSuccess, setFormError, nextStep, email }) => {
	const [repeatPassword, setRepeatPassword] = useState('')
	const [password, setPassword] = useState('')
	const [userName, setUserName] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		// check if the username has a valid syntax
		if (!isValidUsername(userName) || userName.length <= 4) {
			setFormError(
				'Username needs at least 5 characters and may only contain letters, numbers and underscores'
			)
			return
		}

		// check if the password and repeat password matches
		if (password !== repeatPassword) {
			setFormError('Password and repeat password are not the same')
			return
		}

		// check if the password has at least 6 characters
		if (password.length <= 6) {
			setFormError('Password needs a length of at least 7 characters')
			return
		}

		// send the data to the server
		finishUserSignup(email, userName, password, getJWT())
			.then(res => {
				setFormSuccess(
					'Registration successfull! We are redirecting you to the login page now'
				)
				nextStep()
			})
			.catch(err => setFormError(err.message))
	}

	return (
		<>
			<div className='mb-3'>
				<label htmlFor='usernameInput' className='form-label'>
					Username
				</label>
				<input
					type='text'
					className='form-control primary-input'
					placeholder='_Warrior12_'
					id='usernameInput'
					onChange={e => setUserName(e.target.value)}
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='passwordInput' className='form-label'>
					Password
				</label>
				<input
					type='password'
					className='form-control primary-input'
					placeholder='P@ssw0rd!'
					id='passwordInput'
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='repeatPasswordInput' className='form-label'>
					Repeat your password
				</label>
				<input
					type='password'
					className='form-control primary-input'
					placeholder='P@ssw0rd!'
					id='repeatPasswordInput'
					onChange={e => setRepeatPassword(e.target.value)}
				/>
			</div>
			<div className='login-buttons-wrapper'>
				<button
					type='submit'
					className='btn btn-primary'
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>
		</>
	)
}

export default VerifyEmail
