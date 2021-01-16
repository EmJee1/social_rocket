import { useState } from 'react'

const LoginPage = () => {
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12'>
					<div className='form-wrapper form-wrapper-login'>
						<form>
							<div className='mb-3'>
								<label htmlFor='usernameInput' className='form-label'>
									Username
								</label>
								<input
									type='text'
                                    className='form-control primary-input'
                                    placeholder='someone@example.com'
									id='usernameInput'
									aria-describedby='emailHelp'
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
