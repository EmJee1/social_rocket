import './style/main.scss'

import { Switch, Route } from 'react-router-dom'
import { useState } from 'react'

import LoginPage from './pages/LoginPage'
import Nav from './components/Nav'

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	return (
		<div className='App'>
			<Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
			<Switch>
				<Route path='/' exact></Route>
				<Route path='/login' exact>
					<LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
				</Route>
			</Switch>
		</div>
	)
}

export default App