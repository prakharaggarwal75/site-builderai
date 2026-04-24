import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import userRouter from './routes/userRoutes';
import projectRouter from './routes/projectRoutes';
import { stripeWebhook } from './controllers/stripeWebhook';

const app = express();
const port = 3000;

/* 🔥 REQUIRED */
app.use(express.json());

/* 🔥 SAFE CORS FOR LOCAL DEV */
app.use(
  cors({
    origin: process.env.TRUSTED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.post('/api/stripe', express.raw({type: 'application/json'}), stripeWebhook)
/* Better Auth */
app.use('/api/auth', toNodeHandler(auth));
app.use(express.json({limit: '50mb'}))
app.get('/', (_req, res) => {
  res.send('Server is Live!');
});

app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
