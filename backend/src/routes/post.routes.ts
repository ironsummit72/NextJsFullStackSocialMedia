import { Router } from 'express'
import { createPost, editPost, deletePost,getPersonalizedReels, getAllPostsByUsername, getPostById, recommendedPosts, likePost, savePost, isSaved, isLiked,getSavedPostsByUsername,getLikesOfPostByPostId,getPersonalizedPost} from '../controller/post.controller'
import upload from '../middleware/multer.middleware'
import { get } from 'http'
const router = Router()

router.get('/:id', getPostById)
router.get('/personalized/post', getPersonalizedPost)
router.get('/personalized/reels', getPersonalizedReels)
router.get('/likes/:postId', getLikesOfPostByPostId)
router.get('/user/:username', getAllPostsByUsername)
router.get('/r/recommended', recommendedPosts)
router.get('/savedposts/:username',getSavedPostsByUsername)
router.get('/isliked/:postId', isLiked)
router.get('/issaved/:postId', isSaved)
router.post('/create', upload.array('posts'), createPost)
router.patch('/:id', editPost)
router.patch('/like/:postId', likePost)
router.patch('/save/:postId', savePost)
router.delete('/:postId', deletePost)
export default router
