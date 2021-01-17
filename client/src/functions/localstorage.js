export const setJWT = jwt => {
	localStorage.setItem('jwt', jwt)
}

export const getJWT = () => localStorage.get('jwt')