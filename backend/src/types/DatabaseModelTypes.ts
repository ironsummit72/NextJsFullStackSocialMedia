import {ObjectId, Schema} from 'mongoose'

export interface UserModel {
	username: string
	firstName: string
	lastName: string
	email: string
	password: string
	bio:string
	posts: Array<DB_Relation>
	displayPicturePath: string
	savedPosts:[],
	taggedPosts:[],
	followers:[],
	following:[]
	likedPosts:[]

}
export interface PostModel {
	user: ObjectId
	caption: string
	content: []
	likes: []
	comments: []
	hashtags: []
	mentions: []
}
export interface CommentModel {
	author: ObjectId
	postId: ObjectId
	message: string
	replies: []
}
export interface ReplyModel {
	author: ObjectId
	postId: ObjectId
	commentId: ObjectId
	message: string
	likes: []
}
export interface HashTagModel {
	tagname: string
	followers: []
	posts: []
}
export interface DB_Relation {
	type: Schema
	ref: string
}
