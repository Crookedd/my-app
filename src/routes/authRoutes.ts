import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { API_BASE_PATH } from '../config/constants';

const router = Router();

router.post(`${API_BASE_PATH}/signup`, authController.register);
router.post(`${API_BASE_PATH}/signin`, authController.login);
router.get(`${API_BASE_PATH}/me`, authenticateJWT, authController.getUserData);
router.delete(`${API_BASE_PATH}/me`, authenticateJWT, authController.deleteUser);

export const authRoutes = router;
