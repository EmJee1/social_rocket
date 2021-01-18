export const setJWT = jwt => {
	localStorage.setItem('jwt', jwt)
}

export const getJWT = () => localStorage.getItem('jwt')

export const isValidUsername = userName => /^\w+$/.test(userName)