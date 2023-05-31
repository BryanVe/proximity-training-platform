type TrainingDTO = {
	id: number
	organization?: string
	startDate?: string
	endDate?: string
	dni?: string
	module?: string
	scenario?: string
	modality?: string
	result?: string
	criticalErrors?: string
	minorErrors?: string
	eppNoTomados?: string
	eppIncorrectamenteTomados?: string
	deleted: number
}

type OrganizationFiltersDTO = {
	organization: string
	limit?: number
}

type LastTrainingDTO = {
	id: number
	organization?: string
	startDate?: string
	module?: string
	result?: string
}

type TrainingsFiltersDTO = OrganizationFiltersDTO & {
	module: string
	limit: number
	offset: number
}
