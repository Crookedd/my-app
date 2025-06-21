import { Router } from 'express';
import { commentController } from '../controllers/commentController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { API_BASE_PATH } from '../config/constants';

const router = Router();

router.get(`${API_BASE_PATH}/lessons/:lessonId/comments`, commentController.getCommentsByLesson);
router.post(
  `${API_BASE_PATH}/lessons/:lessonId/comments`,
  authenticateJWT,
  commentController.createComment,
);
router.put(`${API_BASE_PATH}/comments/:id`, authenticateJWT, commentController.updateComment);
router.delete(`${API_BASE_PATH}/comments/:id`, authenticateJWT, commentController.deleteComment);

export const commentRoutes = router;
