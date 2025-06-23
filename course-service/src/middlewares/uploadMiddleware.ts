import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const uploadDir = path.join(__dirname, '../../uploads/images');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Неподдерживаемый тип файла'), false);
  }
};

export const upload = multer({ storage, fileFilter }).single('image');

export const processImage = async (req: any, res: any, next: any) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Файл не был загружен' });
  }

  const inputPath = path.join(uploadDir, req.file.filename);
  const outputPath = path.join(uploadDir, `watermark-${req.file.filename}`);
  const watermarkPath = path.join(__dirname, '../public/watermark.png');

  try {
    const watermark = await sharp(watermarkPath).resize({ width: 100 }).png().toBuffer();

    await sharp(inputPath)
      .resize(800)
      .composite([
        {
          input: watermark,
          gravity: 'northeast',
          blend: 'over',
        },
      ])
      .toFile(outputPath);

    fs.promises.unlink(inputPath).catch((err) => {
      console.error('Не удалось удалить оригинальный файл:', err);
    });

    req.file.path = `/uploads/images/${path.basename(outputPath)}`;
    next();
  } catch (err) {
    console.error('Ошибка обработки изображения:', err);
    res.status(500).json({ message: 'Ошибка при обработке изображения' });
  }
};
