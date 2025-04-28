import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import { authRoutes } from './routes/authRoutes';
import { pingRoutes } from './routes/pingRoutes';
import { courseRoutes } from './routes/courseRoutes';

dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(pingRoutes);
app.use(courseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
