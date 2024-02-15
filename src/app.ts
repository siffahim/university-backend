import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import userRoutes from './app/modules/user/user.route';
const app: Application = express();

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application router
app.use('/api/v1/user', userRoutes);

//testing router
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // res.json('Working Successfully');
//   throw new ApiError(400, 'ore baba error');
//   //next('ore baba error');
//   //next('error');
// });

//global error handler
app.use(globalErrorHandler);

export default app;
