import { Request, Response } from 'express'
import postModel from '../models/posts.model'
import ApiResponse from '../utils/ApiResponse.util'
import userModel from '../models/users.model';

export async function createPost(req: Request, res: Response) {
	const { caption } = req.body;
	if (caption) {
		const postDbResponse = await postModel.create({ caption, content: req.files, user: req.user?.id });
		const userDbResponse = await userModel.updateOne({ _id: req.user?.id }, { $push: { posts: postDbResponse._id } });
		console.log("user DB REsponse", userDbResponse);
		if (postDbResponse && userDbResponse) {
			const response: ApiResponse = {
				data: postDbResponse, message: 'post uploaded successfully', redirect: null, statusCode: 201, statusMessage: 'success',
				success: true
			}
			res.json(response);
		} else {
			const response: ApiResponse = {
				data: postDbResponse, message: 'something went wrong', redirect: null, statusCode: 400, statusMessage: 'failed',
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

export async function getAllPostsByUsername(req: Request, res: Response) {
	const { username } = req.params;
	const postsByUser = await userModel.findOne({ username }, { password: 0, email: 0 }).populate({ path: 'posts' })
	if (postsByUser) {
		const response: ApiResponse = {
			data: postsByUser,
			message: `All Posts related to User`,
			redirect: null,
			statusCode: 200,
			statusMessage: 'success',
			success: true
		}
		res.status(200).json(response);
	}
	else {
		const response: ApiResponse = {
			data: null,
			message: 'user not found',
			statusCode: 404,
			success: false,
			redirect: null,
			statusMessage: "not found"
		}
		res.status(404).json(response)
	}

}
export async function deletePost(req: Request, res: Response) { }
export async function likePost(req: Request, res: Response) { }
export async function savePost(req: Request, res: Response) { }

export async function recommendedPosts(req: Request, res: Response) {
	const userID = req.user?.id
	if (userID) {
		const postsResponse = await postModel.find({ likes: { $nin: [userID] } }).populate('user','-password -posts',);
		if (postsResponse) {
			const response: ApiResponse = {
				data: postsResponse,
				message: "Recommended Posts",
				redirect: null,
				statusCode: 200,
				statusMessage: 'success',
				success: true,
			}
			res.status(200).json(response);
		}
	}
	else {
		const response: ApiResponse = {
			data: null,
			message: "user not found",
			redirect: null,
			statusCode: 404,
			statusMessage: "not found",
			success: false
		}
		res.status(404).json(response)
	}
}
