import { keys } from '@/config'
import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: keys.API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const authRequest = async (
	credentials: CredentialsDTO
): Promise<AuthResponse> => {
	const response = await axiosInstance.post<AuthResponse>(`/auth`, credentials)

	return response.data
}
