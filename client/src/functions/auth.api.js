import { getJWT } from '../functions/misc'

export const handleLoginRequest = async (userName, password) => {
	const res = await fetch(`${window.API_BASEURL}auth/login`, {
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
	const res = await fetch(`${window.API_BASEURL}auth/createUserByEmail`, {
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
	const res = await fetch(`${window.API_BASEURL}auth/verifyEmail`, {
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
	const res = await fetch(`${window.API_BASEURL}auth/finishUserSignup`, {
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

export const getAllPosts = async () => {
	const res = await fetch(`${window.API_BASEURL}posts/getPosts`)
	const data = await res.json()
	if (!data.success) {
		throw new Error(data.message)
	}
	return data
}

export const checkLocalJWT = async () => {
	const currentToken = getJWT()
	if (!currentToken) {
		throw new Error('User is logged out')
	}
	const res = await fetch(`${window.API_BASEURL}auth/verifyToken`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: currentToken, signNewToken: true }),
	})
	const data = await res.json()
	if (!data.success) {
		throw new Error(data.message)
	}
	return data
}

export const submitNewPost = async (image, caption) => {
	const userName = localStorage.getItem('userName')
	const token = getJWT()

	const formData = new FormData()

	formData.append('post-image', image)
	formData.append('userName', userName)
	formData.append('caption', caption)
	formData.append('token', token)

	const res = await fetch(`${window.API_BASEURL}posts/createPost`, {
		method: 'POST',
		body: formData,
	})
	const data = await res.json()
	if (!data.success) {
		throw new Error(data.message)
	}
	return data
}

export const updateProfilePicture = async image => {
	const userName = localStorage.getItem('userName')
	const token = getJWT()

	const formData = new FormData()

	formData.append('profile-picture', image)
	formData.append('userName', userName)
	formData.append('token', token)

	const res = await fetch(`${window.API_BASEURL}user/updateProfilePicture`, {
		method: 'POST',
		body: formData,
	})
	const data = await res.json()
	if (!data.success) {
		throw new Error(data.message)
	}
	return data
}

export const getUserInfoByNameAndToken = async () => {
	const userName = localStorage.getItem('userName')
	const token = getJWT()

	const res = await fetch(
		`${window.API_BASEURL}user/getUserInfoByNameAndToken`,
		{
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({ userName, token }),
		}
	)
	const data = await res.json()
	if (!data.success) {
		throw new Error(data.message)
	}
	return data
}