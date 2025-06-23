import { Router } from 'express';
import { enrollmentController } from '../controllers/enrollmentController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.post(
  `/enrollment/enroll/:courseId`,
  authenticateJWT,
  enrollmentController.enrollUser,
);
router.get(
  `/enrollment/progress/:courseId`,
  authenticateJWT,
  enrollmentController.getCourseProgress,
);

router.post(
  `/enrollment/:courseId/complete/:lessonId`,
  authenticateJWT,
  enrollmentController.completeLesson,
);
router.post(
  `/enrollment/:courseId/uncomplete/:lessonId`,
  authenticateJWT,
  enrollmentController.uncompleteLesson,
);

router.get(`/enrollment/stats/:courseId`, enrollmentController.getEnrollmentStats);

export const enrollmentRoutes = router;
