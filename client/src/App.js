import './style/main.scss'

import { Switch, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { handleLoginRequest } from './api/auth.api'

import LoginPage from './pages/LoginPage'
import Nav from './components/Nav'

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [token, setToken] = useState(false)

	useEffect(() => {
		let mounted = true
		handleLoginRequest().then(res => {
			if (mounted) {
				console.log(res)
			}
		})

		return () => (mounted = false)
	}, [])

	const handleLogin = () => {}

	return (
		<div className='App'>
			<Nav isLoggedIn={isLoggedIn} />
			<Switch>
				<Route path='/' exact></Route>
				<Route path='/login' exact>
					<LoginPage />
				</Route>
			</Switch>
		</div>
	)
}

export default App