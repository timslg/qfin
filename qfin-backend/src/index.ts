import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRouter from './routes/auth.routes';
import auth from './middlewares/auth.middleware';
import profileRouter from './routes/profile.routes';

dotenv.config();

const app: Express = express();
const port = 3000;

mongoose.connect('mongodb://admin:admin@db:27017/qfin', {authSource:"admin"}).then(() => {
  console.log('Connected to MongoDB.')
}).catch( err => {
  console.log('connect: error')
  throw err
});

app.use(express.json());

app.use('/auth', authRouter);

app.use('/profile', profileRouter);

app.get('/test', auth, (req: Request, res: Response) => {
  res.json({message: req.userId})
})

app.get('/ping', (req: Request, res: Response) => {
  let date = new Date();
  res.json({'ping': date})
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});