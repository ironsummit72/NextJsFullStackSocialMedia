import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.util";
import storyModel from "../models/stories.model";
import userModel from "../models/users.model";

export async function getStoriesByUsername(req: Request, res: Response) {
    try {
        const { username } = req.params
        if (username) {
            const userDBResponse = await userModel.findOne({ username }, { password: 0 })
            if (userDBResponse) {
                const storyDbResponse = await storyModel.find({ user: userDBResponse._id }).populate('user', '-password -posts -followers -following -savedPosts -taggedPosts -likedPosts');
                if (storyDbResponse) {
                    const response: ApiResponse = {
                        data: storyDbResponse,
                        message: `stories of ${username}`,
                        redirect: null,
                        statusCode: 200,
                        statusMessage: 'success',
                        success: true
                    }
                    res.status(response.statusCode).json(response)
                } else {
                    const response: ApiResponse = {
                        data: [],
                        message: `no stories found with this username: ${username}`,
                        redirect: null,
                        statusCode: 200,
                        statusMessage: 'success',
                        success: true
                    }
                    res.status(response.statusCode).json(response)
                }
            } else {
                const response: ApiResponse = {
                    data: null,
                    message: `no user found with this username: ${username}`,
                    redirect: null,
                    statusCode: 404,
                    statusMessage: 'not found',
                    success: false
                }
                res.status(response.statusCode).json(response)
            }

        }
        else {
            const response: ApiResponse = {
                data: null,
                message: 'please provide the username in request parameters',
                redirect: null,
                statusCode: 400,
                statusMessage: 'failed',
                success: false
            }
            res.status(response.statusCode).json(response)
        }

    } catch (err) {
        const error = err as Error
        const response: ApiResponse = {
            data: null,
            message: error.message,
            redirect: null,
            statusCode: 500,
            statusMessage: 'error',
            success: false
        }
        res.status(response.statusCode).json(response)

    }
}
export async function createStory(req: Request, res: Response) {
    try {
        const loggedInUser = req.user;
        const dbResponse = await storyModel.create({ user: loggedInUser?.id, contentPath: req.file });
        if (dbResponse) {
            const response: ApiResponse = {
                data: dbResponse,
                message: 'story created successfully',
                redirect: null,
                statusCode: 201,
                statusMessage: 'success',
                success: true
            }
            res.status(response.statusCode).json(response)
        }
        else {
            const response: ApiResponse = {
                data: null,
                message: 'something went wrong',
                redirect: null,
                statusCode: 500,
                statusMessage: 'error',
                success: false
            }
            res.status(response.statusCode).json(response)
        }

    } catch (err) {
        const error = err as Error
        const response: ApiResponse = {
            data: null,
            message: error.message,
            redirect: null,
            statusCode: 500,
            statusMessage: 'error',
            success: false
        }
        res.status(response.statusCode).json(response)
    }
}
export async function deleteStory(req: Request, res: Response) {
    try {
        const { storyId } = req.params
        if (storyId) {
            const dbResponse = await storyModel.findByIdAndDelete(storyId);
            if (dbResponse) {
                const response: ApiResponse = {
                    data: null,
                    message: 'story deleted successfully',
                    redirect: null,
                    statusCode: 200,
                    statusMessage: 'success',
                    success: true
                }
                res.status(response.statusCode).json(response)
            } else {
                const response: ApiResponse = {
                    data: null,
                    message: `no story found with this storyId: ${storyId}`,
                    redirect: null,
                    statusCode: 404,
                    statusMessage: 'not found',
                    success: false
                }
                res.status(response.statusCode).json(response)
            }
        } else {
            const response: ApiResponse = {
                data: null,
                message: 'please provide the storyId in request parameters',
                redirect: null,
                statusCode: 400,
                statusMessage: 'failed',
                success: false
            }
            res.status(response.statusCode).json(response)
        }

    } catch (err) {
        const error = err as Error
        const response: ApiResponse = {
            data: null,
            message: error.message,
            redirect: null,
            statusCode: 500,
            statusMessage: 'error',
            success: false
        }
        res.status(response.statusCode).json(response)
    }
}
export async function likeStory(req: Request, res: Response) {
    try {
        const { storyId } = req.params
        const loggedInUser = req.user
        if (storyId) {
            const isLiked = await storyModel.findOne({ _id: storyId, likes: { $in: [loggedInUser?.id] } });
            if (isLiked) {
                const postsResponse = await storyModel.findByIdAndUpdate(storyId, { $pull: { likes: loggedInUser?.id } })
                if (postsResponse) {
                    const response: ApiResponse = {
                        data: postsResponse,
                        message: "you unliked the story",
                        redirect: null, statusCode: 200,
                        statusMessage: 'success',
                        success: false,
                    }
                    res.status(response.statusCode).json(response)
                } else {
                    const response: ApiResponse = {
                        data: postsResponse,
                        message: `story not found with this ${storyId}`,
                        redirect: null, statusCode: 404,
                        statusMessage: 'success',
                        success: false,
                    }
                    res.status(response.statusCode).json(response)
                }
            } else {
                const postsResponse = await storyModel.findByIdAndUpdate(storyId, { $addToSet: { likes: loggedInUser?.id } })
                if (postsResponse) {
                    const response: ApiResponse = {
                        data: postsResponse,
                        message: "you liked the story",
                        redirect: null, statusCode: 200,
                        statusMessage: 'success',
                        success: true,
                    }
                    res.status(response.statusCode).json(response)
                } else {
                    const response: ApiResponse = {
                        data: postsResponse,
                        message: `story not found with this ${storyId}`,
                        redirect: null, statusCode: 404,
                        statusMessage: 'success',
                        success: false,
                    }
                    res.status(response.statusCode).json(response)
                }
            }
        } else {
            const response: ApiResponse = {
                data: null,
                message: 'please provide the storyId in request parameters',
                redirect: null,
                statusCode: 400,
                statusMessage: 'failed',
                success: false
            }
            res.status(response.statusCode).json(response)
        }

    } catch (err) {
        const error = err as Error
        const response: ApiResponse = {
            data: null,
            message: error.message,
            redirect: null,
            statusCode: 500,
            statusMessage: 'error',
            success: false
        }
        res.status(response.statusCode).json(response)

    }

}
export async function addViewsToStory(req: Request, res: Response) {
    try {
        const { storyId } = req.params
        const loggedInUser = req.user
        const dbResponse = await storyModel.findByIdAndUpdate(storyId, { $addToSet: { seenBy: loggedInUser?.id } })
        if (dbResponse) {
            const response: ApiResponse = {
                data: dbResponse,
                message: 'views added successfully',
                redirect: null,
                statusCode: 200,
                statusMessage: 'success',
                success: true
            }
            res.status(response.statusCode).json(response)
        } else {
            const response: ApiResponse = {
                data: null,
                message: `no story found with this storyId: ${storyId}`,
                redirect: null,
                statusCode: 404,
                statusMessage: 'not found',
                success: false
            }
            res.status(response.statusCode).json(response)
        }

    } catch (err) {
        const error = err as Error
        const response: ApiResponse = {
            data: null,
            message: error.message,
            redirect: null,
            statusCode: 500,
            statusMessage: 'error',
            success: false
        }
        res.status(response.statusCode).json(response)
    }
}