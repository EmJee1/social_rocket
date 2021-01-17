import { handleLoginRequest } from '../functions/auth.api'
import { setJWT } from '../functions/localstorage'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {
	const [formSuccess, setFormSuccess] = useState('')
	const [formError, setFormError] = useState('')
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')

	const history = useHistory()

	useEffect(() => {
		setFormError('')
	}, [userName, password])

	useEffect(() => {
		if (isLoggedIn) {
			setFormSuccess('Login successfull')
			setTimeout(() => history.push('/'), 1000)
		}
	}, [isLoggedIn, history])

	const submitHandler = e => {
		e.preventDefault()

		if (isLoggedIn) return

		if (!userName || !password) {
			setFormError('Please fill in your username and password')
			return
		}

		handleLoginRequest(userName, password)
			.then(res => {
				setJWT(res.token)
				setIsLoggedIn(true)
			})
			.catch(err => setFormError(err.message))
	}

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12 col-lg-6 mx-auto'>
					<div className='form-wrapper form-wrapper-login'>
						<h5 className='form-heading bold'>Login</h5>
						<hr />
						<form onSubmit={submitHandler}>
							{formError && (
								<div className='alert danger-alert' role='alert'>
									{formError}
								</div>
							)}
							{formSuccess && (
								<div className='alert success-alert' role='alert'>
									{formSuccess}
								</div>
							)}
							<div className='mb-3'>
								<label htmlFor='usernameInput' className='form-label'>
									Username
								</label>
								<input
									type='text'
									className='form-control primary-input'
									placeholder='someone@example.com'
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
									placeholder='Password'
									id='passwordInput'
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
							<button type='submit' className='btn btn-primary'>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage