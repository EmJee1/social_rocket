/* eslint-disable no-unused-vars */
import SignupEmail from '../components/signup/SignupEmail'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SignupPage = ({ isLoggedIn, setIsLoggedIn }) => {
	const [emailVerified, setEmailVerified] = useState(false)
	const [formSuccess, setFormSuccess] = useState('')
	const [signupStep, setSignupStep] = useState(0)
	const [formError, setFormError] = useState('')
	const [email, setEmail] = useState('')

	useEffect(() => {
		if (formError) {
			setTimeout(() => setFormError(''), 3600)
		}
	}, [formError])

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12 col-lg-6 mx-auto'>
					<motion.div
						initial={{ y: '-100vh' }}
						animate={{ y: '0vh' }}
						className='form-wrapper form-wrapper-login'
					>
						<h5 className='form-heading bold'>Sign up</h5>
						<hr />
						<motion.form layout>
							<AnimatePresence exitBeforeEnter>
								{formError && (
									<motion.div
										className='alert danger-alert'
										role='alert'
										exit={{ x: '100vw' }}
										transition={{ duration: 0.6 }}
									>
										{formError}
										<motion.span
											className='alert-progress'
											initial={{ width: '0%' }}
											animate={{ width: '100%' }}
											transition={{ duration: 3.4 }}
										></motion.span>
									</motion.div>
								)}
								{formSuccess && (
									<div className='alert success-alert' role='alert'>
										{formSuccess}
									</div>
								)}
								{signupStep === 0 && (
									<SignupEmail email={email} setEmail={setEmail} />
								)}
								<div className='login-buttons-wrapper'>
									<button type='submit' className='btn btn-primary'>
										Submit
									</button>
									<Link to='/login'>
										<span className='bold'>Log in</span>
									</Link>
								</div>
							</AnimatePresence>
						</motion.form>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default SignupPage