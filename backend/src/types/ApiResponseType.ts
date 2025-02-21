import { Request,Response } from "express"
export interface ApiResponseType {
	success: boolean
	statusCode: number
	statusMessage: string
	data: any | null
	message: string | any
	redirect: string | null
}
