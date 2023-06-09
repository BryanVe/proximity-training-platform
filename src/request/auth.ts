import { axiosInstance } from '.'

export const authRequest = async (
	credentials: CredentialsDTO
): Promise<UserDTO> => {
	const response = await axiosInstance.post<AuthResponse>(`/auth`, credentials)

	return response.data.message
}

export const updatePasswordRequest = async (
	args: UpdatePasswordDTO
): Promise<string> => {
	const response = await axiosInstance.post<UpdatePasswordResponse>(
		`/update-password`,
		args
	)

	return response.data.message
}
