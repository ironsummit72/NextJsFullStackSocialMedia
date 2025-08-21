import { Router } from "express";
import {userFollowUnfollow, isFollowing,isFollowingByUsername, searchUser} from "../controller/user.controller";
const router=Router();
router.post('/follow/:userId',userFollowUnfollow)
router.get('/isfollowing/:userId',isFollowing)
router.get('/isfollowing/username/:username',isFollowingByUsername)
router.get(`/search/:searchTerm`,searchUser)
export default router;