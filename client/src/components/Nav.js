import { setJWT } from '../functions/misc'
import rocket from '../images/rocket.svg'
import { Link } from 'react-router-dom'

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
	const handleLogout = () => {
		setJWT('')
		setIsLoggedIn(false)
	}

	return (
		<nav className='custom-nav navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<Link to='/'>
					<img src={rocket} alt='Rocket logo' />
					<h1 className='navbar-brand bold'>Social Rocket</h1>
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<Link to='/'>
								<p className={`nav-link`}>
									Feed
								</p>
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/'>
								<p className='nav-link'>Chat</p>
							</Link>
						</li>
						<li className='nav-item'>
							<Link to={isLoggedIn ? '/profile' : '/login'}>
								<p
									className={`nav-link`}
								>
									{isLoggedIn ? 'Profile' : 'Log in'}
								</p>
							</Link>
						</li>
						{isLoggedIn && (
							<li className='nav-item padding-nav-item'>
								<p onClick={handleLogout} className='nav-link'>
									Log out
								</p>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Nav