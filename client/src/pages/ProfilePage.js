const ProfilePage = () => {
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12 col-md-6'>
					<div className='profile-block'>
						<h2 className='bold'>Personal settings</h2>
                        <hr />
						<form>
							<div className='mb-3'>
								<label htmlFor='usernameInput' className='form-label'>
									Username
								</label>
								<input
									type='text'
									className='form-control primary-input'
									id='usernameInput'
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
								/>
							</div>
							<div className='login-buttons-wrapper'>
								<button type='submit' className='btn btn-primary'>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className='col-12 col-md-6'></div>
			</div>
		</div>
	)
}

export default ProfilePage
