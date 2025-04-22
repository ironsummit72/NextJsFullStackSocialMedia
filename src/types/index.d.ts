export interface USER  {
    username: string,
    fullName: string,
    id: string
  }
  interface UserData {
    _id:string,
    username:string,
    email:string,
    firstName:string,
    lastName:string,
    displayPicturePath:string,
    bio:string
    likedPosts:PostData[],
    savedPosts:PostData[],
    followers:UserData[],
    following:UserData[]
  }
  type contentType={
    fieldname: string,
    originalname:string
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
  }
  export interface PostData{
    _id:string,
    user:UserData,
    caption:string,
    content:Array<contentType>
    //TODO:👇 define there types later 
    comments:[]
    hastags:[]
    likes:[]
    mentions:[]
    createdAt:string
  }