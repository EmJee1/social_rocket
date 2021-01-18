export const handleLoginRequest = async (userName, password) => {
	const res = await fetch(`${window.API_BASEURL}users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userName, password }),
	})
	const data = await res.json()
	if (!data.success) {
		throw new Error(data.message)
	}
	return data
}

export const createUserByEmail = async email => {
	const res = await fetch(`${window.API_BASEURL}users/createUserByEmail`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email }),
	})
	const data = await res.json()
	if (!data.success) {
		throw new Error(data.message)
	}
	return data.message
}

export const verifyEmail = async (email, verificationCode) => {
	const res = await fetch(`${window.API_BASEURL}users/verifyEmail`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, verificationCode }),
	})
	const data = await res.json()
	if (!data.success || !data.token) {
		throw new Error(data.message)
	}
	return data
}

export const finishUserSignup = async (email, userName, password, token) => {
	const res = await fetch(`${window.API_BASEURL}users/finishUserSignup`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, userName, password, token }),
	})
	const data = await res.json()
	if (!data.success) {
		throw new Error(data.message)
	}
	return data
}