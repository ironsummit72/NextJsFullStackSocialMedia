import mongoose, {Schema} from 'mongoose'
import {HashTagModel} from '../types/DatabaseModelTypes'
const hashTagSchema = new Schema<HashTagModel>({
	tagname: {
		type: String,
		required: true,
	},
	followers: [
		,
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
		},
	],
})
const hashTagmodel = mongoose.model('Hashtag', hashTagSchema)
export default hashTagmodel
