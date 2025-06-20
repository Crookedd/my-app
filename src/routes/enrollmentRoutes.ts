import { Router } from 'express';
import { enrollmentController } from '../controllers/enrollmentController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.post('/:courseId', authenticateJWT, enrollmentController.enroll);
router.get('/my', authenticateJWT, enrollmentController.getUserEnrollments);
router.delete('/:courseId', authenticateJWT, enrollmentController.unenroll);

export const enrollmentRoutes = router;