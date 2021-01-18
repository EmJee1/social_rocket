/* eslint-disable no-unused-vars */
import FinalDetails from '../components/signup/FinalDetails'
import SignupEmail from '../components/signup/SignupEmail'
import VerifyEmail from '../components/signup/VerifyEmail'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { setJWT } from '../functions/misc'

const SignupPage = ({ history }) => {
	const [formSuccess, setFormSuccess] = useState('')
	const [signupStep, setSignupStep] = useState(0)
	const [formError, setFormError] = useState('')
	const [email, setEmail] = useState('')

	useEffect(() => {
		if (formError) {
			setTimeout(() => setFormError(''), 4400)
		}
		if (formSuccess) {
			setTimeout(() => setFormSuccess(''), 3600)
		}
	}, [formError, formSuccess])

	const nextStep = () => setSignupStep(signupStep + 1)
	const prevStep = () => setSignupStep(signupStep - 1)

	const renderCurrentStep = () => {
		switch (signupStep) {
			case 0:
				return (
					<motion.div
						initial={{ x: '100vw' }}
						animate={{ x: '0vw' }}
						exit={{ x: '-100vw' }}
					>
						<SignupEmail
							setFormSuccess={setFormSuccess}
							setFormError={setFormError}
							setEmail={setEmail}
							nextStep={nextStep}
							email={email}
							key='signupemail'
						/>
					</motion.div>
				)
			case 1:
				return (
					<motion.div
						initial={{ x: '100vw' }}
						animate={{ x: '0vw' }}
						exit={{ x: '-100vw' }}
					>
						<VerifyEmail
							setFormSuccess={setFormSuccess}
							setFormError={setFormError}
							nextStep={nextStep}
							prevStep={prevStep}
							email={email}
							key='verifyemail'
						/>
					</motion.div>
				)
			case 2:
				return (
					<motion.div
						initial={{ x: '100vw' }}
						animate={{ x: '0vw' }}
						exit={{ x: '-100vw' }}
					>
						<FinalDetails
							setFormSuccess={setFormSuccess}
							setFormError={setFormError}
							nextStep={nextStep}
							email={email}
							key='finaldetails'
						/>
					</motion.div>
				)
			case 3:
				setJWT('')
				setTimeout(() => history.push('/login'), 3400)
				return null
			default:
				return null
		}
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
						<h5 className='form-heading bold'>Sign up</h5>
						<hr />
						<motion.form layout>
							<AnimatePresence>
								{formError && (
									<motion.div
										className='alert danger-alert'
										role='alert'
										exit={{ x: '100vw' }}
										transition={{ duration: 0.6 }}
										key='error'
									>
										{formError}
										<motion.span
											className='alert-progress'
											initial={{ width: '0%' }}
											animate={{ width: '100%' }}
											transition={{ duration: 4 }}
										></motion.span>
									</motion.div>
								)}
								{formSuccess && (
									<motion.div
										className='alert success-alert'
										role='alert'
										exit={{ x: '100vw' }}
										transition={{ duration: 0.6 }}
										key='success'
									>
										{formSuccess}
										<motion.span
											className='success-progress'
											initial={{ width: '0%' }}
											animate={{ width: '100%' }}
											transition={{ duration: 3.4 }}
										></motion.span>
									</motion.div>
								)}
								{renderCurrentStep()}
							</AnimatePresence>
						</motion.form>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default SignupPage
