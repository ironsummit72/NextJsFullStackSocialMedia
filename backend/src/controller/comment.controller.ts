import { Request, Response } from "express";
import commentModel from "../models/comments.model";
import postModel from "../models/posts.model";
import replyModel from "../models/reply.model";
import ApiResponse from "../utils/ApiResponse.util";

export async function getCommentsByPostId(req: Request, res: Response) {
    try {
        const limit = Number(req.query.limit);
        const page = Number(req.query.page);
        const startPage = (page - 1) * limit;
        const { postId } = req.params;
        if (page && limit) {
            if (postId) {
                const endPage = Math.ceil(await commentModel.find({ postId }).countDocuments() / limit)
                const commentResponse = await commentModel.find({ postId }).skip(startPage).limit(limit).populate({ path: 'user', select: '-password' }).populate({
                    path: 'replies', populate: {
                        path: "user"
                    }
                });
                const response: ApiResponse = {
                    data: {
                        endPage,
                        commentResponse
                    },
                    message: `comments of ${postId}`,
                    redirect: null,
                    statusCode: 200,
                    statusMessage: 'success',
                    success: true
                }
                res.status(response.statusCode).json(response);

            } else {
                const response: ApiResponse = {
                    data: null,
                    message: 'please provide the postId in query params',
                    redirect: null,
                    statusCode: 400,
                    statusMessage: 'bad request',
                    success: false
                }
                res.status(400).json(response)
            }

        } else {
            const response: ApiResponse = {
                data: null,
                message: 'either page or limit or both not provided',
                redirect: null,
                statusCode: 400,
                statusMessage: 'bad request',
                success: false
            }
            res.status(response.statusCode).json(response);

        }

    } catch (err) {
        const error = err as Error
        console.error(error.message);
        const response: ApiResponse = {
            data: null,
            message: error.message,
            redirect: null,
            statusCode: 500,
            statusMessage: 'error',
            success: false
        }
        res.status(500).json(response)

    }
}
export async function createComment(req: Request, res: Response) {
    try {
        const { postId } = req.params;
        const { message } = req.body;
        const loggedInUser = req.user;
        if (postId) {
            if (loggedInUser) {
                if (message) {
                    const postResponse = await postModel.findById(postId);
                    if (postResponse) {
                        const commentResponse = await commentModel.create({ user: loggedInUser.id, message, postId });
                        const postResponse = await postModel.updateOne({ _id: postId }, { $push: { comments: commentResponse._id } })
                        if (commentResponse && postResponse) {
                            const response: ApiResponse = {
                                data: null,
                                message: "commented on Post",
                                redirect: null,
                                statusCode: 201,
                                statusMessage: 'success',
                                success: true
                            }
                            res.status(201).json(response);
                        } else {
                            const response: ApiResponse = {
                                data: null,
                                message: "Something went wrong",
                                redirect: null,
                                statusCode: 500,
                                statusMessage: 'error',
                                success: false
                            }
                            res.status(response.statusCode).json(response);
                        }
                    } else {
                        const response: ApiResponse = {
                            data: null,
                            message: 'Post not found',
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
                        message: 'please provide the message in the request body',
                        redirect: null,
                        statusCode: 400,
                        statusMessage: 'bad request',
                        success: false
                    }
                    res.status(400).json(response)
                }

            } else {
                const response: ApiResponse = {
                    data: null,
                    message: 'user not loggedIn',
                    redirect: null,
                    statusCode: 400,
                    statusMessage: 'bad request',
                    success: false
                }
                res.status(400).json(response)

            }

        } else {
            const response: ApiResponse = {
                data: null,
                message: 'please provide the postId',
                redirect: null,
                statusCode: 400,
                statusMessage: 'bad request',
                success: false,
            }
            res.status(400).json(response)
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
        res.status(500).json(response)
    }
}
export async function editCommentById(req: Request, res: Response) {
    try {
        const { commentId } = req.params;
        const { message } = req.body
        if (commentId) {
            if (message) {
                const dbResponse = await commentModel.findByIdAndUpdate(commentId, { message, isEdited: true })
                if (dbResponse) {
                    const response: ApiResponse = {
                        data: null,
                        message: "comment edited successfuly",
                        redirect: null,
                        statusCode: 200,
                        statusMessage: 'success',
                        success: true
                    }
                    res.status(response.statusCode).json(response)
                } else {
                    const response: ApiResponse = {
                        data: dbResponse,
                        message: "comment not found",
                        redirect: null,
                        statusCode: 404,
                        statusMessage: 'failed',
                        success: false
                    }
                    res.status(response.statusCode).json(response)
                }
            } else {
                const response: ApiResponse = {
                    data: null,
                    message: 'please enter the message which you want to edit',
                    redirect: null,
                    statusCode: 400,
                    statusMessage: 'failed',
                    success: false
                }
                res.status(response.statusCode).json(response)
            }

        } else {
            const response: ApiResponse = {
                data: null,
                message: 'please provide commentId in query parameters',
                redirect: null,
                statusCode: 400,
                statusMessage: 'bad request',
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
export async function deleteCommentById(req: Request, res: Response) {
    try {
        const { commentId } = req.params;
        if (commentId) {
            const dbResponse = await commentModel.findByIdAndDelete(commentId);
            if (dbResponse?.$isDeleted) {
                const response: ApiResponse = {
                    data: null,
                    message: "comment deleted successfully",
                    redirect: null,
                    statusCode: 200,
                    statusMessage: "success",
                    success: true
                }
                res.status(response.statusCode).json(response);
            } else {
                const response: ApiResponse = {
                    data: null,
                    message: 'comment not found',
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
                message: 'comment id not provided',
                redirect: null,
                statusCode: 400,
                statusMessage: 'bad request',
                success: false,
            }
            res.status(response.statusCode).json(response)
        }
    } catch (err) {
        const error = err as Error;
        console.error(error.message);
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
export async function likeComment(req: Request, res: Response) {
    try {
        const { commentId } = req.params;
        const loggedInUser = req.user
        if (commentId) {
            const commentResponse = await commentModel.findByIdAndUpdate(commentId, { $addToSet: { likes: loggedInUser?.id } })
            if (commentResponse) {
                const response: ApiResponse = {
                    data: false,
                    message: 'like added successfully',
                    redirect: null,
                    statusCode: 200,
                    statusMessage: 'success',
                    success: true
                }
                res.status(response.statusCode).json(response)

            } else {
                const response: ApiResponse = {
                    data: null,
                    message: `comment not found with this id ${commentId}`,
                    redirect: null,
                    statusCode: 404, statusMessage: 'not found',
                    success: false
                }
                res.status(response.statusCode).json(response);
            }
        } else {
            const response: ApiResponse = {
                data: null,
                message: 'commentId not provided',
                redirect: null,
                statusCode: 400,
                statusMessage: 'bad request',
                success: false
            }
            res.status(response.statusCode).json(response);
        }
    } catch (err) {
        const error = err as Error;
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
export async function replyComment(req: Request, res: Response) {
    try {
        const { commentId } = req.params;
        const { message } = req.body;
        const loggedInuser = req.user;
        if (commentId) {
            if (message) {
                const replyResponse = await replyModel.create({ parentCommentId: commentId, message, user: loggedInuser?.id });
                if (replyResponse) {
                    const dbResponse = await commentModel.findByIdAndUpdate(commentId, { $push: { replies: replyResponse?._id } })
                    if (dbResponse) {
                        const response: ApiResponse = {
                            data: null,
                            message: 'reply added successfully',
                            redirect: null,
                            statusCode: 201,
                            statusMessage: 'created',
                            success: true
                        }
                        res.status(response.statusCode).json(response);
                    }
                } else {
                    const response: ApiResponse = {
                        data: null,
                        message: 'comment not found',
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
                    message: 'message not provided in request body',
                    redirect: null,
                    statusCode: 400,
                    statusMessage: 'bad request',
                    success: false
                }
                res.status(response.statusCode).json(response);

            }

        } else {
            const response: ApiResponse = {
                data: null,
                message: "commentId not provided in params",
                redirect: null,
                statusCode: 400,
                statusMessage: 'bad request',
                success: false
            }
            res.status(response.statusCode).json(response)
        }

    } catch (err) {
        const error = err as Error;
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
export async function likeReplyComment(req: Request, res: Response) {
    try {
        const { replyCommentId } = req.params;
        const loggedInUser = req.user
        if (replyCommentId) {
            const replyResponse = await replyModel.findByIdAndUpdate(replyCommentId, { $addToSet: { likes: loggedInUser?.id } });
            if (replyResponse) {
                const response: ApiResponse = {
                    data: null,
                    message: 'like added successfully',
                    redirect: null,
                    statusCode: 200,
                    statusMessage: "success",
                    success: true
                }
                res.status(response.statusCode).json(response);
            } else {
                const response: ApiResponse = {
                    data: null,
                    message: 'reply not found',
                    redirect: null,
                    statusCode: 404,
                    statusMessage: "not found",
                    success: false
                }
                res.status(response.statusCode).json(response);
            }

        } else {
            const response: ApiResponse = {
                data: null,
                message: 'reply comment id not provided',
                redirect: null,
                statusCode: 400,
                statusMessage: 'bad request',
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
export async function deleteReply(req: Request, res: Response) {
    try {
        const { replyCommentId } = req.params;
        const dbResponse = await replyModel.findByIdAndDelete(replyCommentId);
        if (dbResponse?.$isDeleted) {
            const response: ApiResponse = {
                data: null,
                message: 'reply deleted successfully',
                redirect: null,
                statusCode: 200,
                statusMessage: 'success',
                success: true
            }
            res.status(response.statusCode).json(response);


        } else {
            const response: ApiResponse = {
                data: null,
                message: 'reply not found',
                redirect: null,
                statusCode: 404,
                statusMessage: 'not found',
                success: false,
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
        res.status(response.statusCode).json(response);
    }
}