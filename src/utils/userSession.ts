import { constants } from '@/config'

export const getUserSession = (): UserDTO | null => {
	const userSessionAsString = localStorage.getItem(constants.USER_SESSION)
	if (!userSessionAsString) return null
	return JSON.parse(userSessionAsString) as UserDTO
}

export const setUserSession = (user: UserDTO) => {
	const userAsString = JSON.stringify(user)
	localStorage.setItem(constants.USER_SESSION, userAsString)
}

export const removeUserSession = () =>
	localStorage.removeItem(constants.USER_SESSION)
