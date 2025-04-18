import { createComment, getCommentsByPostId, editCommentById, deleteCommentById, likeComment, replyComment, likeReplyComment, deleteReply } from "../controller/comment.controller";
import { Router } from 'express';
const router = Router();
router.get('/:postId', getCommentsByPostId)
router.post('/create/:postId', createComment)
router.post('/reply/:commentId', replyComment)
router.patch('/edit/:commentId', editCommentById)
router.patch('/like/:commentId', likeComment)
router.patch('/reply/like/:replyCommentId', likeReplyComment)
router.delete('/delete/:commentId', deleteCommentById)
router.delete('/reply/delete/:replyCommentId', deleteReply)
export default router