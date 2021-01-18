import { createUserByEmail } from '../../functions/auth.api'
import { Link } from 'react-router-dom'

const SignupEmail = ({
	email,
	setEmail,
	setFormError,
	setFormSuccess,
	nextStep,
}) => {
	const handleEmailSubmit = e => {
		e.preventDefault()

		createUserByEmail(email)
			.then(res => {
				setFormSuccess(res)
				nextStep()
			})
			.catch(err => setFormError(err.message))
	}

	return (
		<>
			<div className='mb-3'>
				<label htmlFor='usernameInput' className='form-label'>
					Email address
				</label>
				<input
					value={email}
					type='email'
					className='form-control primary-input'
					placeholder='someone@example.com'
					id='usernameInput'
					onChange={e => setEmail(e.target.value)}
				/>
			</div>
			<div className='login-buttons-wrapper'>
				<button
					type='submit'
					className='btn btn-primary'
					onClick={handleEmailSubmit}
				>
					Submit
				</button>
				<Link to='/login'>
					<span className='bold'>Log in</span>
				</Link>
			</div>
		</>
	)
}

export default SignupEmail