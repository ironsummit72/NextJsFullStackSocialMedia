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
    const {limit}=req.query
    try {
        const loggedInUserId = req.user?.id
        const user = await userModel.findById(loggedInUserId);
        if (user) {
            const suggestedUsers = await userModel.find({
                _id: { $nin: [loggedInUserId, ...user.following] },
            }).limit(Number(limit)??5).select('-password');
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
