import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import { API_BASE_PATH } from './config/constants';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  `${API_BASE_PATH}/users`,
  createProxyMiddleware({
    target: 'http://user-service:3001',
    changeOrigin: true,
    pathRewrite: { [`^${API_BASE_PATH}/users`]: '' },
  }),
);

app.use(
  `${API_BASE_PATH}/courses`,
  createProxyMiddleware({
    target: 'http://course-service:3002',
    changeOrigin: true,
    pathRewrite: { [`^${API_BASE_PATH}/courses`]: '' },
  }),
);

app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.originalUrl}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Gateway запущен на http://localhost:${PORT}`);
});
