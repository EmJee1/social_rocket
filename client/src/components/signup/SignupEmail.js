const SignupEmail = ({ setEmail }) => {
	return (
		<div className='mb-3'>
			<label htmlFor='usernameInput' className='form-label'>
				Email address
			</label>
			<input
				type='email'
				className='form-control primary-input'
				placeholder='someone@example.com'
				id='usernameInput'
				onChange={e => setEmail(e.target.value)}
			/>
		</div>
	)
}

export default SignupEmail