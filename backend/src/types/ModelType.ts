import { ObjectId, Schema } from "mongoose";

export interface UserModel {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  posts: Array<DB_Relation>;
}
export interface PostModel {
  user: ObjectId;
  caption: string;
  content: [];
}
export interface DB_Relation {
  type: Schema;
  ref: string;
}
