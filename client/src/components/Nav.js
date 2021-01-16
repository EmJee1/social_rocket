import rocket from '../images/rocket.svg'
import { Link } from 'react-router-dom'

const Nav = ({ isLoggedIn }) => {
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
								<p className='nav-link active'>Feed</p>
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/'>
								<p className='nav-link'>Chat</p>
							</Link>
						</li>
						<li className='nav-item'>
							<Link to={isLoggedIn ? '/profile' : '/login'}>
								{isLoggedIn && <p className='nav-link'>Profile</p>}
								{!isLoggedIn && <p className='nav-link'>Log in</p>}
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Nav