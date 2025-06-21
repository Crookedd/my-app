import { Router } from 'express';
import { enrollmentController } from '../controllers/enrollmentController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { API_BASE_PATH } from '../config/constants';

const router = Router();

router.post(
  `${API_BASE_PATH}/enrollment/enroll/:courseId`,
  authenticateJWT,
  enrollmentController.enrollUser,
);
router.get(
  `${API_BASE_PATH}/enrollment/progress/:courseId`,
  authenticateJWT,
  enrollmentController.getCourseProgress,
);

router.post(
  `${API_BASE_PATH}/enrollment/:courseId/complete/:lessonId`,
  authenticateJWT,
  enrollmentController.completeLesson,
);
router.post(
  `${API_BASE_PATH}/enrollment/:courseId/uncomplete/:lessonId`,
  authenticateJWT,
  enrollmentController.uncompleteLesson,
);

router.get(`${API_BASE_PATH}/enrollment/stats/:courseId`, enrollmentController.getEnrollmentStats);

export const enrollmentRoutes = router;
