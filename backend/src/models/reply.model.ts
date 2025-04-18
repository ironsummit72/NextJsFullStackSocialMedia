import mongoose, { Schema } from 'mongoose'
import { ReplyModel } from '../types/DatabaseModelTypes'

export const replySchema = new Schema<ReplyModel>({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	parentCommentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: []
		}
	],
	message: {
		type: String,
		default: '',
		required: true
	}


})
const replyModel = mongoose.model('Reply', replySchema)
export default replyModel
