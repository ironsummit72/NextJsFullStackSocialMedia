import mongoose, { Schema } from 'mongoose';
import { StoriesModel } from '../types/DatabaseModelTypes';

const StorySchema = new Schema<StoriesModel>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    contentPath: {
        type: Object,
        required: true
    },
    seenBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

}, { timestamps: true })
StorySchema.index({ createdAt: 1 }, { expires: '24h' })
export const storyModel = mongoose.model('Story', StorySchema)
export default storyModel
