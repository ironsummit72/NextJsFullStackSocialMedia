import {Router} from 'express'
import {createPost, editPost, deletePost, getAllPostsByUsername, getPostById,recommendedPosts, likePost, savePost} from '../controller/post.controller'
import upload from '../middleware/multer.middleware'
const router = Router()

router.get('/:id', getPostById)
router.get('/user/:username', getAllPostsByUsername)
router.get('/r/recommended',recommendedPosts)
//TODO: explore post
router.post('/create',upload.array('posts'), createPost)
router.patch('/:id', editPost)
router.patch('/like/:id',likePost)
router.patch('/save/:id',savePost)
router.delete('/:id', deletePost)
export default router
