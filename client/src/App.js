import './style/main.scss'

import { Switch, Route, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'

import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import Nav from './components/Nav'

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [pathName, setPathName] = useState('/')

	const history = useHistory()

	useEffect(() => {
		if (pathName !== window.location.pathname)
			setPathName(window.location.pathname)
	}, [pathName])

	return (
		<div className='App'>
			<Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
			<Switch>
				<Route path='/' exact></Route>
				<Route path='/login' exact>
					<LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
				</Route>
				<Route path='/signup' exact>
					<SignupPage history={history} />
				</Route>
			</Switch>
		</div>
	)
}

export default App