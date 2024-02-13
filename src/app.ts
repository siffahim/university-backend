import cors from 'cors';
import express, { Application } from 'express';
import userRoutes from './app/modules/user/user.route';
const app: Application = express();

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application router
app.use('/api/v1/user', userRoutes);

// class ApiError extends Error {
//   statusCode: number;
//   constructor(statusCode: number, message: string | undefined, stack = '') {
//     super(message);
//     this.statusCode = statusCode;
//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

//testing router
// app.get('/', (req: Request, res: Response) => {
//   // res.json('Working Successfully');
//   throw new ApiError(400, 'ore baba error');
// });

export default app;
