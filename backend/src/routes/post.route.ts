import {Router} from 'express'
import {createPost, editPost, deletePost, getAllPosts, getPostById} from '../controller/post.controller'
const router = Router()

router.post('/create', createPost)
router.get('/:id', getPostById)
router.get('/', getAllPosts)
router.patch('/:id', editPost)
router.delete('/:id', deletePost)

export default router
