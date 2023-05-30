import { axiosInstance } from '.'

export const getMostUsedModulesRequest = async (
	filters: OrganizationFiltersDTO
): Promise<MostUsedModulesResponse> => {
	const response = await axiosInstance.post<MostUsedModulesResponse>(
		`/training/most-used-modules`,
		filters
	)

	return response.data
}
