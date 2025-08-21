import { Request, Response } from "express";
import userModel from "../models/users.model";
import ApiResponse from "../utils/ApiResponse.util";
import path from "path";




export async function getDisplaypicture(req: Request, res: Response) {
    const { username } = req.params
    if (username) {
        try {
            const dbResponse = await userModel.findOne({ username });
            if (dbResponse) {
                if (dbResponse.displayPicturePath === null) {
                    const filepath = path.join(__dirname, '..', '..', 'public', 'nodp.svg');
                    res.sendFile(filepath, (err) => {
                        if (err) {
                            const response: ApiResponse = {
                                data: null,
                                message: "file not found",
                                redirect: null,
                                statusCode: 404,
                                statusMessage: 'not found',
                                success: false
                            }
                            res.status(404).json(response);
                        }
                    });
                } else {
                    const filename = dbResponse?.displayPicturePath
                    const filepath = path.join(__dirname, '..', '..', 'uploads', 'displaypicture', 'image', filename);
                    res.sendFile(filepath, (err) => {
                        if (err) {
                            const response: ApiResponse = {
                                data: null,
                                message: "file not found",
                                redirect: null,
                                statusCode: 404,
                                statusMessage: 'not found',
                                success: false
                            }
                            res.status(404).json(response);
                        }
                    });
                }
            } else {
                const response: ApiResponse = {
                    data: null, message: "user not found",
                    redirect: null,
                    statusCode: 404,
                    statusMessage: 'not found',
                    success: false
                }
                res.status(404).json(response)
            }

        } catch (error) {
            console.error(error);

        }

    } else {

        try {
            const dbResponse = await userModel.findOne({ username: req.user?.username });
            if (dbResponse) {
                const filename = dbResponse?.displayPicturePath
                const filepath = path.join(__dirname, '..', '..', 'uploads', 'displaypicture', filename);
                console.log('fp', filepath);

                res.sendFile(filepath, (err) => {
                    if (err) {
                        res.status(404).json({ message: 'File not found' });
                    }
                });

            }

        } catch (error) {
            console.error(error);


        }
    }


}
export async function uploadDisplayPicture(req: Request, res: Response) {
    try {
        const dbResponse = await userModel.updateOne({ username: req.user?.username }, { $set: { displayPicturePath: req.file?.filename } })
        if (dbResponse) {
            const response: ApiResponse = {
                data: dbResponse,
                statusCode: 201,
                message: "profile picture uploaded successfully",
                redirect: null,
                statusMessage: 'success',
                success: true
            }
            res.status(200).json(response)
        } else {
            const response: ApiResponse = {
                data: null,
                statusCode: 400,
                message: "something went wrong",
                redirect: null,
                statusMessage: 'failed',
                success: false
            }
            res.status(400).json(response)
        }

    } catch (error) {
        const response: ApiResponse = {
            data: null,
            message: error,
            redirect: null,
            statusCode: 400,
            statusMessage: 'error',
            success: false
        }
        res.status(400).json(response)

    }
}
export async function createBio(req: Request, res: Response) {
}
export async function updateProfileInfo(req: Request, res: Response) {
}
export async function getUserInfo(req: Request, res: Response) {
    const { username } = req.params;
    if (username) {
        const userInfo = await userModel.findOne({ username }).populate('posts').select('-password');
        if (userInfo) {
            const response: ApiResponse = {
                data: userInfo,
                message: 'User Information',
                redirect: null,
                statusCode: 200,
                statusMessage: 'success',
                success: true
            }
            res.status(200).json(response)
        } else {
            const response: ApiResponse = {
                data: userInfo,
                message: 'User Not Found',
                redirect: null,
                statusCode: 404,
                statusMessage: 'not found',
                success: false
            }
            res.status(404).json(response)
        }
    }

}
export async function suggestUser(req: Request, res: Response) {
    const { limit } = req.query
    try {
        const loggedInUserId = req.user?.id
        const user = await userModel.findById(loggedInUserId);
        if (user) {
            const suggestedUsers = await userModel.find({
                _id: { $nin: [loggedInUserId, ...user.following] },
            }).limit(Number(limit) ?? 5).select('-password');
            const response: ApiResponse = {
                success: true,
                data: suggestedUsers,
                message: "suggested user",
                redirect: null,
                statusCode: 200,
                statusMessage: "success"
            }
            res.status(200).json(response);
        }
    } catch (error) {
        const errorResponse: ApiResponse = { data: null, message: "something went wrong", redirect: null, statusCode: 500, statusMessage: "failed", success: false }
        res.status(500).json(errorResponse)
    }

}

export async function updateBio(req: Request, res: Response) {
    try {
        const { username } = req.params;
        const { bio } = req.body
        if (username && bio) {
            const dbResponse = await userModel.updateOne({ username }, { bio });
            if (dbResponse.modifiedCount = 1) {
                const response: ApiResponse = {
                    data: null, message: "bio updated successfully",
                    redirect: null,
                    statusCode: 200,
                    statusMessage: 'succcess',
                    success: true
                }
                res.status(200).json(response)
            }
        } else {
            const response: ApiResponse = {
                data: null, message: "either username or bio is missing ", redirect: null,
                statusCode: 400,
                statusMessage: 'error',
                success: false
            }
            res.status(400).json(response)
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
        res.status(500).json(response);
    }
}
export async function getFollowers(req: Request, res: Response) {
    try {
        const { username } = req.params;
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        console.log("page", page, "limit", limit);
        const startIndex = (page - 1) * limit;
        if (page && limit) {
            if (username) {
                const dbResponse = await userModel.findOne({ username }).populate({ path: 'followers', select: '-password', options: { skip: startIndex, limit } }).select('-password -_id -posts -following -username -email -firstName -lastName -displayPicturePath');
                const endPage = Math.ceil(dbResponse!['followers'].length / limit)
                if (dbResponse) {
                    const response: ApiResponse = {
                        data: { dbResponse, endPage },
                        message: 'here is the followers data',
                        redirect: null,
                        statusCode: 200,
                        statusMessage: 'success',
                        success: true
                    }
                    res.status(200).json(response)
                }
            } else {
                const response: ApiResponse = {
                    data: null,
                    message: 'please provide username as query params ',
                    redirect: null,
                    statusCode: 400,
                    statusMessage: "failed",
                    success: false
                }
                res.status(400).json(response)
            }
        } else {
            const response: ApiResponse = {
                data: null,
                message: 'please provide page and limit as query string ',
                redirect: null,
                statusCode: 400,
                statusMessage: 'failed',
                success: false
            }
            res.status(400).json(response)
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
        res.status(500).json(response)
    }

}
export async function getFollowing(req: Request, res: Response) {
    try {
        const { username } = req.params;
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        console.log("page", page, "limit", limit);
        const startIndex = (page - 1) * limit;
        if (page && limit) {
            if (username) {
                const dbResponse = await userModel.findOne({ username }).populate({ path: 'following', select: '-password', options: { skip: startIndex, limit } }).select('-password -_id -posts -followers -username -email -firstName -lastName -displayPicturePath');
                const endPage = Math.ceil(dbResponse!['following'].length / limit)
                if (dbResponse) {
                    const response: ApiResponse = {
                        data: { dbResponse, endPage },
                        message: 'here is the following data',
                        redirect: null,
                        statusCode: 200,
                        statusMessage: 'success',
                        success: true
                    }
                    res.status(200).json(response)
                }
            } else {
                const response: ApiResponse = {
                    data: null,
                    message: 'please provide username as query params ',
                    redirect: null,
                    statusCode: 400,
                    statusMessage: "failed",
                    success: false
                }
                res.status(400).json(response)
            }
        } else {
             const dbResponse = await userModel.findOne({ username }).populate({ path: 'following', select: '-password -posts -followers -following -likedPosts -savedPosts -taggedPosts -bio -createdAt -updatedAt -__v -email -firstName -lastName -displayPicturePath',  }).select('-password -_id -posts -followers -username -email -firstName -lastName -displayPicturePath -likedPosts -savedPosts -taggedPosts');
             const response: ApiResponse = {
                data: dbResponse,
                message: 'here is the following data',
                redirect: null,
                statusCode: 200,
                statusMessage: 'failed',
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
        res.status(500).json(response)
    }

}
