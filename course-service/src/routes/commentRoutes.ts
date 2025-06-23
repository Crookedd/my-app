import { Router } from 'express';
import { commentController } from '../controllers/commentController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get(`/lessons/:lessonId/comments`, commentController.getCommentsByLesson);
router.post(`/lessons/:lessonId/comments`, authenticateJWT, commentController.createComment);
router.put(`/comments/:id`, authenticateJWT, commentController.updateComment);
router.delete(`/comments/:id`, authenticateJWT, commentController.deleteComment);

export const commentRoutes = router;
