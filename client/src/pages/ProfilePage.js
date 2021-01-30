import {
	updateProfilePicture,
	getUserInfoByNameAndToken,
} from '../functions/auth.api'
import { useState, useEffect } from 'react'

const ProfilePage = () => {
	const [updatedUserName, setUpdatedUserName] = useState(
		localStorage.getItem('userName')
	)
	const [profilePicture, setProfilePicture] = useState('')

	useEffect(() => {
		getUserInfoByNameAndToken()
			.then(res => setProfilePicture(res.profilePicture))
			.catch(err => console.error(err))
	}, [])

	const profileImageSelected = e => {
		updateProfilePicture(e.target.files[0])
			.then(res => {
				setProfilePicture(res.profilePicture)
			})
			.catch(err => console.error(err.message))
	}

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
									onChange={e => profileImageSelected(e)}
									type='file'
									style={{ display: 'none' }}
								/>
								<label htmlFor='select-profile-picture'>
									<div className='profile-picture-change-image-wrapper'>
										<img src={profilePicture} alt='' />
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
									onChange={e => setUpdatedUserName(e.target.value)}
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