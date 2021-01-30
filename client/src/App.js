import './style/main.scss'

import { checkLocalJWT, getUserInfoByNameAndToken } from './functions/auth.api'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { setJWT } from './functions/misc'

import ProfilePage from './pages/ProfilePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import Nav from './components/Nav'
import Feed from './pages/Feed'

const App = () => {
	const [profilePicture, setProfilePicture] = useState('')
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const history = useHistory()

	useEffect(() => {
		if (isLoggedIn) {
			getUserInfoByNameAndToken()
				.then(res => setProfilePicture(res.profilePicture))
				.catch(err => console.error(err))
		}
	}, [isLoggedIn])

	useEffect(() => {
		let mounted = true
		checkLocalJWT()
			.then(res => {
				if (mounted) {
					setIsLoggedIn(true)
					setJWT(res.token)
				}
			})
			.catch(err => {
				setIsLoggedIn(false)
			})
		return () => (mounted = false)
	}, [])

	return (
		<div className='App'>
			<Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
			<Switch>
				<Route path='/' exact>
					<Feed isLoggedIn={isLoggedIn} />
				</Route>
				<Route path='/login' exact>
					<LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
				</Route>
				<Route path='/signup' exact>
					<SignupPage history={history} />
				</Route>
				<Route path='/profile' exact>
					<ProfilePage
						isLoggedIn={isLoggedIn}
						profilePicture={profilePicture}
						setProfilePicture={setProfilePicture}
					/>
				</Route>
			</Switch>
		</div>
	)
}

export default App