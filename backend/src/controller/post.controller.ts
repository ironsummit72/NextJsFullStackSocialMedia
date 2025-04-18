
import { Request, Response } from 'express'
import postModel from '../models/posts.model'
import ApiResponse from '../utils/ApiResponse.util'
import userModel from '../models/users.model';

export async function createPost(req: Request, res: Response) {
	const { caption } = req.body;
	if (caption) {
		const postDbResponse = await postModel.create({ caption, content: req.files, user: req.user?.id });
		const userDbResponse = await userModel.updateOne({ _id: req.user?.id }, { $push: { posts: postDbResponse._id } });
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

export async function getPostById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		if (id) {
			const dbResponse = await postModel.findById(id).populate({ path: "user", select: "-password" }).populate({ path: "comments" });
			if (dbResponse) {
				const response: ApiResponse = {
					data: dbResponse,
					message: 'post data',
					redirect: null,
					statusCode: 200,
					statusMessage: 'success',
					success: true

				}
				res.status(200).json(response)
			} else {
				const response: ApiResponse = {
					data: dbResponse,
					message: 'post data',
					redirect: null,
					statusCode: 404,
					statusMessage: 'not found',
					success: false
				}
				res.status(200).json(response)
			}
		}
		else {
			const response: ApiResponse = {
				data: null,
				message: 'please provide the ',
				redirect: null,
				statusCode: 404,
				statusMessage: 'not found',
				success: false
			}
			res.status(200).json(response)
			res.status(200).json()
		}

	} catch (err) {
		const error = err as Error
		const response: ApiResponse = {
			data: null,
			message: error.message,
			redirect: null, statusCode: 500,
			statusMessage: 'error',
			success: false
		}
		res.status(200).json(response)
	}
}

export async function getAllPostsByUsername(req: Request, res: Response) {
	const { username } = req.params;
	const page = Number(req.query?.page);
	const limit = Number(req.query?.limit);
	const startIndex = (page - 1) * limit;

	if (username) {
		const userId = await userModel.findOne({ username }).select('-password');
		if (userId) {
			if (page && limit) {
				const endPage = Math.ceil(await postModel.find({ user: userId.id }).countDocuments() / limit)
				const postData = await postModel.find({ user: userId.id }).skip(startIndex).limit(limit);
				if (postData) {
					const response: ApiResponse = {
						data: { postData, endPage },
						message: "Recommended Posts",
						redirect: null,
						statusCode: 200,
						statusMessage: 'success',
						success: true,
					}
					res.status(200).json(response);
				} else {
					const response: ApiResponse = {
						data: null, message: "no post found",
						redirect: null,
						statusCode: 404,
						statusMessage: 'not found',
						success: false
					}
					res.status(404).json(response);
				}
			} else {
				const response: ApiResponse = {
					data: null,
					message: "please provide limit and page query params ",
					redirect: null,
					statusCode: 400,
					statusMessage: 'failed',
					success: false
				}
				res.status(400).json(response);
			}
		}
	} else {
		const response: ApiResponse = {
			data: null,
			message: "username not found",
			redirect: null,
			statusCode: 404,
			statusMessage: "Not Found",
			success: false
		}

		res.status(404).json(response)
	}


}
export async function deletePost(req: Request, res: Response) { }
export async function likePost(req: Request, res: Response) { }
export async function savePost(req: Request, res: Response) { }

export async function recommendedPosts(req: Request, res: Response) {
	try {
		const userID = req.user?.id;
		const page = Number(req.query?.page);
		const limit = Number(req.query?.limit);
		const startIndex = (page - 1) * limit;
		const endPage = Math.ceil(await postModel.find({ likes: { $nin: [userID] } }).populate('user', '-password -posts').countDocuments() / limit);
		if (userID) {
			if (page && limit) {
				const postsResponse = await postModel.find({ likes: { $nin: [userID] } }).populate('user', '-password -posts',).skip(startIndex).limit(limit);
				if (postsResponse) {
					const response: ApiResponse = {
						data: { postsResponse, endPage },
						message: "Recommended Posts",
						redirect: null,
						statusCode: 200,
						statusMessage: 'success',
						success: true,
					}
					res.status(200).json(response);
				}
			} else {
				const postsResponse = await postModel.find({ likes: { $nin: [userID] } }).populate('user', '-password -posts',);
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

	} catch (error) {
		const response: ApiResponse = {
			data: null,
			message: "something went wrong",
			redirect: null,
			statusCode: 500,
			statusMessage: "Server Error",
			success: false
		}
		res.status(500).json(response)
	}
}


