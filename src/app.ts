import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application router
app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/academic-semester', AcademicSemesterRoutes);

//testing router
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   //Promise.reject(new Error('Unhandle promise rejected'));
//   // res.json('Working Successfully');
//   //throw new ApiError(400, 'ore baba error');
//   //next('ore baba error');
//   //('error');
//   throw new Error('Testing error logger');
// });

//global error handler
app.use(globalErrorHandler);

export default app;
