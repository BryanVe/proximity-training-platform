import { axiosInstance } from '.'

export const authRequest = async (
	credentials: CredentialsDTO
): Promise<UserDTO> => {
	const response = await axiosInstance.post<AuthResponse>(`/auth`, credentials)

	return response.data.message
}
