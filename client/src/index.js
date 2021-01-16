import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'

window.API_BASEURL = 'http://localhost:5000/v1/'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)