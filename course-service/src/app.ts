import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import path from 'path';

import { courseRoutes } from './routes/courseRoutes';
import { uploadRoutes } from './routes/uploadRoutes';
import { lessonRoutes } from './routes/lessonRoutes';
import { commentRoutes } from './routes/commentRoutes';
import { enrollmentRoutes } from './routes/enrollmentRoutes';
import { connectRabbit } from './rabbit';

dotenv.config();
const PORT = 3002;

connectDB();

const app = express();
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(courseRoutes);
app.use(uploadRoutes);
app.use(lessonRoutes);
app.use(commentRoutes);
app.use(enrollmentRoutes);

app.listen(PORT, async () => {
  try {
    await connectDB();
    await connectRabbit();

    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('Ошибка при запуске сервиса:', err);
    process.exit(1);
  }
});
