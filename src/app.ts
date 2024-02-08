import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { generateUserId } from './app/modules/user/user.util';
const app: Application = express();

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json('Working Successfully');
});

console.log(generateUserId());

export default app;
