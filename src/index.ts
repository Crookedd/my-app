import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import path from 'path';

import { authRoutes } from './routes/authRoutes';
import { pingRoutes } from './routes/pingRoutes';
import { courseRoutes } from './routes/courseRoutes';
import { uploadRoutes } from './routes/uploadRoutes';

dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(authRoutes);
app.use(pingRoutes);
app.use(courseRoutes);
app.use(uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
