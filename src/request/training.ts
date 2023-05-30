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

export const getMostCommonResultsRequest = async (
	filters: OrganizationFiltersDTO
): Promise<MostCommonResultsResponse> => {
	const response = await axiosInstance.post<MostCommonResultsResponse>(
		`/training/most-common-results`,
		filters
	)

	return response.data
}

export const getLastTrainingsRequest = async (
	filters: OrganizationFiltersDTO
): Promise<LastTrainingsResponse> => {
	const response = await axiosInstance.post<LastTrainingsResponse>(
		`/training/last`,
		filters
	)

	return response.data
}
