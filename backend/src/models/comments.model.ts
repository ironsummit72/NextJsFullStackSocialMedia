import mongoose, {Schema} from 'mongoose'
import {CommentModel} from '../types/DatabaseModelTypes'
import {replySchema} from './reply.model'
const commentSchema = new Schema<CommentModel>(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		message: {
			type: String,
			required: true,
		},
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		replies: [replySchema],
	},
	{
		timestamps: true,
	},
)
const commentModel = mongoose.model('Comment', commentSchema)
export default commentModel
