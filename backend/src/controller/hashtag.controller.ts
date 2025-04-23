import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.util";
import hashTagmodel from "../models/hashtags.model";
export async function getPostsByHashtag(req: Request, res: Response) {
    try {
        const { hashtag } = req.params
        if (hashtag) {
            const tagResponse = await hashTagmodel.findOne({ tagname: hashtag.trim() }).populate({ path: "posts" });
            if (tagResponse) {
                const response: ApiResponse = {
                    data: tagResponse,
                    message: 'posts by this Hashtag',
                    redirect: null,
                    statusCode: 200,
                    statusMessage: 'success',
                    success: true
                }
                res.status(response.statusCode).json(response)
            } else {
                const response: ApiResponse = {
                    data: null,
                    message: `no post found by this Hashtag: ${hashtag}`,
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
                message: 'please provide the Hashtag in Request Parameters',
                redirect: null,
                statusCode: 400,
                statusMessage: 'failed',
                success: false
            }
            res.status(response.statusCode).json(response)
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
        res.status(response.statusCode).json(response)
    }
}
