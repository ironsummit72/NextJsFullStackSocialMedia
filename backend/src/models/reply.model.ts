import mongoose, {Schema} from 'mongoose'
import {ReplyModel} from '../types/DatabaseModelTypes'
export const replySchema = new Schema<ReplyModel>({
	author: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
	},
	commentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
	},
	message: {
		type: String,
		required: true,
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
})
const replyModel = mongoose.model('Reply', replySchema)
export default replyModel
