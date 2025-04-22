import { Router } from 'express';
import { pingController } from '../controllers/pingController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { API_BASE_PATH } from '../config/constants';

const router = Router();

router.get(`${API_BASE_PATH}/ping`, authenticateJWT, pingController.ping);

export const pingRoutes = router;
