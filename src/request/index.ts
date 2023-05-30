import { keys } from '@/config'
import axios from 'axios'

export const axiosInstance = axios.create({
	baseURL: keys.API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

export * from './auth'
export * from './training'
