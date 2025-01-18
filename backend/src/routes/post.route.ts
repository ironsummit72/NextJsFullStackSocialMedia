import {Router} from 'express'
import {createPost, editPost, deletePost, getAllPosts, getPostById} from '../controller/post.controller'
import upload from '../middleware/multer.middleware'
const router = Router()

router.post('/create',upload.array('posts'), createPost)
router.get('/:id', getPostById)
router.get('/', getAllPosts)
router.patch('/:id', editPost)
router.delete('/:id', deletePost)

export default router
