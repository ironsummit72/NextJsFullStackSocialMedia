import { Request, Response } from 'express'
import { CustomRequest } from '../types/ApiResponseType'
import postModel from '../models/posts.model'
import ApiResponse from '../utils/ApiResponse.util'
export async function createPost(req: Request, res: Response) {
	const { caption } = req.body;
	if (caption) {
		const dbResponse = await postModel.create({ caption, content: req.files })
		if (dbResponse) {
			const response: ApiResponse = {
				data: dbResponse, message: 'post uploaded successfully', redirect: null, statusCode: 201, statusMessage: 'success',
				success: true
			}
			res.json(response);
		} else {
			const response: ApiResponse = {
				data: dbResponse, message: 'something went wrong', redirect: null, statusCode: 400, statusMessage: 'failed',
				success: false
			}
			res.json(response);
		}
	} else {
		const response: ApiResponse = {
			data: null, message: "Caption Required", redirect: null, statusCode: 400, statusMessage: 'failed', success: false
		}
		res.json(response);
	}

}
export async function editPost(req: Request, res: Response) { }
export async function getPostById(req: Request, res: Response) { }
export async function getAllPosts(req: CustomRequest, res: Response) { }
export async function deletePost(req: Request, res: Response) { }
