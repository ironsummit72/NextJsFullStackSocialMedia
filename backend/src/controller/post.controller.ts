import {Request, Response} from 'express'
import { CustomRequest } from '../types/ApiResponseType'
export async function createPost(req: Request, res: Response) {
	return res.send('hello')
}
export async function editPost(req: Request, res: Response) {}
export async function getPostById(req: Request, res: Response) {

}
export async function getAllPosts(req: CustomRequest, res: Response) {

    
}
export async function deletePost(req: Request, res: Response) {}
