import { Router } from "express";
import { getStoriesByUsername, createStory, deleteStory, likeStory, addViewsToStory } from "../controller/stories.controller";
import upload from '../middleware/multer.middleware'

const router = Router();
router.get('/stories/:username', getStoriesByUsername)
router.post('/create', upload.single('story'), createStory)
router.patch('/like/:storyId', likeStory)
router.patch('/addviews/:storyId', addViewsToStory)
router.delete('/delete/:storyId', deleteStory)
export default router