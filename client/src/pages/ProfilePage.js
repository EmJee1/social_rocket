import profileImage from '../images/sample-profile.jfif'
import { useState } from 'react'

const ProfilePage = () => {
	const [updatedUserName, setUpdatedUserName] = useState(
		localStorage.getItem('userName')
	)
	const [updatedProfilePicture, setUpdatedProfilePicture] = useState()

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12 col-md-6'>
					<div className='profile-block'>
						<h2 className='bold'>Personal settings</h2>
						<hr />
						<form>
							<div className='mb-3 profile-picture-change'>
								<input
									id='select-profile-picture'
									type='file'
									style={{ display: 'none' }}
								/>
								<label htmlFor='select-profile-picture'>
									<div className='profile-picture-change-image-wrapper'>
										<img src={profileImage} alt='' />
									</div>
								</label>
							</div>
							<div className='mb-3'>
								<label htmlFor='usernameInput' className='form-label'>
									Username
								</label>
								<input
									type='text'
									className='form-control primary-input'
									id='usernameInput'
									value={updatedUserName}
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
