import { Router } from "express";
import {userFollowUnfollow, isFollowing} from "../controller/user.controller";
const router=Router();
router.post('/follow/:userId',userFollowUnfollow)
router.post('/isFollowing/:userId',isFollowing)
export default router;