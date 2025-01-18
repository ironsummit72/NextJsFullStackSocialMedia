import mongoose, { Schema } from "mongoose";
import { PostModel } from "../types/DatabaseModelTypes";
const PostSchema = new Schema<PostModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  caption: {
    type: String,
    required: true,
  },
  content: [],
});
const postModel = mongoose.model("PostModel", PostSchema);
export default postModel;
