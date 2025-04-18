import mongoose, { Schema } from 'mongoose'
import { CommentModel } from '../types/DatabaseModelTypes'
const commentSchema = new Schema<CommentModel>(
	{
		user: {
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
		replies: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Reply"
		}],
		isEdited: {
			type: Boolean,
			default: false
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				default: []
			}
		]
	},
	{
		timestamps: true,
	},
)
const commentModel = mongoose.model('Comment', commentSchema)
export default commentModel
