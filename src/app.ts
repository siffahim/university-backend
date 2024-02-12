import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import userRoutes from './app/modules/user/user.route';
const app: Application = express();

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application router
app.use('/api/v1/user', userRoutes);

//testing router
app.get('/', async (req: Request, res: Response) => {
  res.json('Working Successfully');
});

export default app;
