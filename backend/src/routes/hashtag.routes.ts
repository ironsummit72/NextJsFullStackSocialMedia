import { Router } from "express";
import { getPostsByHashtag } from "../controller/hashtag.controller";
const router=Router();

router.get('/:hashtag',getPostsByHashtag);

export default router