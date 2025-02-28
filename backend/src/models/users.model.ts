import mongoose, { Schema } from 'mongoose'
import { UserModel } from '../types/DatabaseModelTypes'
import { hashPassword } from '../utils/genHashPassword.util'
const userSchema = new Schema<UserModel>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		posts: [{ type: Schema.Types.ObjectId, ref: 'Post', default: [] }],
		displayPicturePath: {
			type: String,
			default: null,
		},
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				default: [],
			},
		],
		following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				default: [],
			},
		],
		likedPosts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Post',
				default: [],
			},
		],
		savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: [] }],
		taggedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: [] }],
		bio: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true },
)
userSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) {
			return next()
		} else {
			const hashedPassword = await hashPassword(this.password)
			this.password = hashedPassword
			next()
		}
	} catch (err) {
		console.error(err)
	}
})
const userModel = mongoose.model('User', userSchema)
export default userModel
