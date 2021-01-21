import { verifyEmail } from '../../functions/auth.api'
import { setJWT } from '../../functions/misc'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const VerifyEmail = ({
	setFormSuccess,
	setFormError,
	prevStep,
	nextStep,
	email,
}) => {
	const [verificationCode, setVerificationCode] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		verifyEmail(email, verificationCode)
			.then(res => {
				setJWT(res.token)
				setFormSuccess(res.message)
				nextStep()
			})
			.catch(err => setFormError(err.message))
	}

	return (
		<>
			<div className='mb-3'>
				<label htmlFor='verificationCodeInput' className='form-label'>
					Verification code
				</label>
				<input
					type='number'
					className='form-control primary-input'
					placeholder='123456'
					id='verificationCodeInput'
					onChange={e => setVerificationCode(e.target.value)}
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
				<Link to='/signup' onClick={() => prevStep()}>
					<span className='bold'>Change e-mail address</span>
				</Link>
			</div>
		</>
	)
}

export default VerifyEmail