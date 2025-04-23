import { Router } from "express";
import {userFollowUnfollow, isFollowing,isFollowingByUsername} from "../controller/user.controller";
const router=Router();
router.post('/follow/:userId',userFollowUnfollow)
router.get('/isfollowing/:userId',isFollowing)
router.get('/isfollowing/username/:username',isFollowingByUsername)
export default router;