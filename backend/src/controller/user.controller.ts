
import { Request, Response } from "express";
import userModel from "../models/users.model";
import ApiResponse from "../utils/ApiResponse.util";
export async function userFollowUnfollow(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const loggedInUserId = req.user?.id;
        const loggedInUser = await userModel.findOne({ _id: loggedInUserId });
        const followUserId = await userModel.findOne({ _id: userId });
        const followingArray: string[] = loggedInUser?.following as string[];
        const followersArray: string[] = followUserId?.followers as string[];
        const isFollowing = followingArray.includes(userId) && followersArray.includes(loggedInUserId!);
        if (isFollowing) {
            await userModel.findByIdAndUpdate(userId, { $pull: { followers: loggedInUserId } });
            await userModel.findByIdAndUpdate(loggedInUserId, { $pull: { following: userId } });
            const response: ApiResponse = {
                message: "user unfollowed successfully",
                data: null, redirect: null,
                statusCode: 200,
                statusMessage: 'success',
                success: true
            }
            res.status(200).json(response)

        } else {
            await userModel.findByIdAndUpdate(userId, { $addToSet: { followers: loggedInUserId } });
            await userModel.findByIdAndUpdate(loggedInUserId, { $addToSet: { following: userId } });
            const response: ApiResponse = {
                message: "user followed successfully",
                data: null, redirect: null,
                statusCode: 200,
                statusMessage: 'success',
                success: true
            }
            res.status(200).json(response)
        }

    } catch (e) {
        const response: ApiResponse = {
            message: "something went wrong",
            data: null, redirect: null,
            statusCode: 500,
            statusMessage: 'error',
            success: false
        }
        res.status(500).json(response)
    }
}
export async function isFollowing(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const loggedInUserId = req.user?.id;
        if (userId && loggedInUserId) {
            const loggedInUser = await userModel.findOne({ _id: loggedInUserId });
            const followUserId = await userModel.findOne({ _id: userId });
            const followingArray: string[] = loggedInUser?.following as string[];
            const followersArray: string[] = followUserId?.followers as string[];
            const isFollowing = followingArray.includes(userId) && followersArray.includes(loggedInUserId!);
            const response: ApiResponse = {
                data: isFollowing,
                message: `user is ${isFollowing}`,
                redirect: null, statusCode: 200,
                statusMessage: 'success',
                success: true
            }
            res.status(200).json(response)
        } else {
            const response: ApiResponse = {
                data: null,
                message: "Either LoggedIn user of UserId missing",
                redirect: null,
                statusCode: 400,
                statusMessage: 'error',
                success: false
            }
            res.status(400).json(response)
        }

    } catch (e) {
        const error = e as Error
        const response: ApiResponse = {
            data: null,
            message: error.message,
            redirect: null,
            statusCode: 500,
            statusMessage: 'error',
            success: false
        }
        res.status(500).json(response)
        console.error(error.message);
    }

}