import { handleLoginRequest } from '../functions/auth.api'
import { motion, AnimatePresence } from 'framer-motion'
import { useHistory, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { setJWT } from '../functions/misc'
import Alert from '../components/Alert'

const LoginPage = ({ isLoggedIn, setIsLoggedIn, setUserName }) => {
	const [formSuccess, setFormSuccess] = useState('')
	const [formError, setFormError] = useState('')
	const [loginUserName, setLoginUserName] = useState('')
	const [password, setPassword] = useState('')

	const history = useHistory()

	useEffect(() => {
		setFormError('')
	}, [loginUserName, password])

	useEffect(() => {
		if (isLoggedIn) {
			setFormSuccess('Login successfull')
			setTimeout(() => history.push('/'), 1000)
		}
	}, [isLoggedIn, history])

	useEffect(() => {
		if (formError) {
			setTimeout(() => setFormError(''), 3600)
		}
	}, [formError])

	const submitHandler = e => {
		e.preventDefault()

		if (isLoggedIn) return

		if (!loginUserName || !password) {
			setFormError('Please fill in your username and password')
			return
		}

		localStorage.setItem('userName', loginUserName)

		handleLoginRequest(loginUserName, password)
			.then(res => {
				setJWT(res.token)
				setIsLoggedIn(true)
			})
			.catch(err => {
				setFormError(err.message)
			})
	}

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12 col-lg-6 mx-auto'>
					<motion.div
						initial={{ y: '-100vh' }}
						animate={{ y: '0vh' }}
						className='form-wrapper form-wrapper-login'
					>
						<h5 className='form-heading bold'>Login</h5>
						<hr />
						<motion.form onSubmit={submitHandler} layout>
							<AnimatePresence>
								{formError && (
									<Alert
										type='danger'
										alertText={formError}
										transitionTime={3.4}
									/>
								)}
								{formSuccess && (
									<Alert
										type='success'
										alertText={formSuccess}
										transitionTime={.8}
									/>
								)}
							</AnimatePresence>
							<div className='mb-3'>
								<label htmlFor='usernameInput' className='form-label'>
									Username
								</label>
								<input
									type='text'
									className='form-control primary-input'
									placeholder='someone@example.com'
									id='usernameInput'
									onChange={e => setLoginUserName(e.target.value)}
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
							<div className='login-buttons-wrapper'>
								<button type='submit' className='btn btn-primary'>
									Submit
								</button>
								<Link to='/signup'>
									<span className='bold'>Sign up</span>
								</Link>
							</div>
						</motion.form>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage