import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { connectRabbit } from './rabbit';
import { authRoutes } from './routes/authRoutes';
import { startConsumers } from './rabbitConsumer';

dotenv.config();
const app = express();
const PORT = 3001;

app.use(express.json());

(async () => {
  try {
    await connectDB();
    await connectRabbit();
    await startConsumers();

    app.use(authRoutes);

    app.listen(PORT, () => {
      console.log(`User-service запущен на http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Ошибка запуска user-service:', err);
    process.exit(1);
  }
})();
