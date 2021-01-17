export const apiBodyResponse = (success, message) => {
	return { success, message }
}

export const isValidUsername = userName => /^\w+$/.test(userName)