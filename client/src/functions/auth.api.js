export const handleLoginRequest = async (userName, password) => {
	const res = await fetch(`${window.API_BASEURL}users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userName, password }),
	})
	const data = await res.json()
	if(!data.success) {
		throw new Error(data.message)
	}
	return data
}