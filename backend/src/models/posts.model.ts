import mongoose, {Schema} from 'mongoose'
import {PostModel} from '../types/DatabaseModelTypes'
const PostSchema = new Schema<PostModel>({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	caption: {
		type: String,
		required: true,
	},
	content: [],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
      default:[]
		},
	],
	hashtags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Hashtag',
      default:[]
		},
	],
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
      default:[]
		},
	],
	mentions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
      default:[]
		},
	],

})
const postModel = mongoose.model('Post', PostSchema)
export default postModel
