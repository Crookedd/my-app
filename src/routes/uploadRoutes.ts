import { Router, Request, Response } from 'express';
import { upload, processImage } from '../middlewares/uploadMiddleware';
import { API_BASE_PATH } from '../config/constants';

const router = Router();

router.post(
  `${API_BASE_PATH}/upload`,
  upload,
  processImage,
  (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ message: 'Файл не загружен.' });
      return;
    }

    const imageUrl = `${req.protocol}://${req.get('host')}${req.file.path.replace('public', '')}`;
    res.status(200).json({ path: imageUrl });
  },
);

export const uploadRoutes = router;
