import { Router } from 'express';
import { enrollmentController } from '../controllers/enrollmentController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { API_BASE_PATH } from '../config/constants';

const router = Router();

router.post(`${API_BASE_PATH}/enroll/:courseId`, authenticateJWT, enrollmentController.enrollUser);
router.get(`${API_BASE_PATH}/progress/:courseId`, authenticateJWT, enrollmentController.getCourseProgress);

router.post(`${API_BASE_PATH}/:courseId/complete/:lessonId`,authenticateJWT, enrollmentController.completeLesson);
router.post(`${API_BASE_PATH}/:courseId/uncomplete/:lessonId`, authenticateJWT, enrollmentController.uncompleteLesson);

router.get(`${API_BASE_PATH}/stats/:courseId`, enrollmentController.getEnrollmentStats);


export const enrollmentRoutes = router;