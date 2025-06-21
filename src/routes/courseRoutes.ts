import { Router } from 'express';
import { courseController } from '../controllers/courseController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { API_BASE_PATH } from '../config/constants';

const router = Router();

router.get(`${API_BASE_PATH}/courses`, courseController.getCourses);
router.get(`${API_BASE_PATH}/courses/:id`, courseController.getCourseById);

router.post(`${API_BASE_PATH}/courses`, authenticateJWT, courseController.createCourse);
router.put(`${API_BASE_PATH}/courses/:id`, authenticateJWT, courseController.updateCourse);
router.delete(`${API_BASE_PATH}/courses/:id`, authenticateJWT, courseController.deleteCourse);

router.post(
  `${API_BASE_PATH}/courses/:id/favorites`,
  authenticateJWT,
  courseController.addToFavorites,
);
router.delete(
  `${API_BASE_PATH}/courses/:id/favorites`,
  authenticateJWT,
  courseController.removeFromFavorites,
);

export const courseRoutes = router;
