import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { generateStudentId } from './app/modules/user/user.util';
import routes from './routes';
const app: Application = express();

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application router
app.use('/api/v1', routes);

//global error handler
app.use(globalErrorHandler);

const run = async () => {
  const test = await generateStudentId({ code: '01', year: '2025' });
  console.log(test);
};

run();

//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found'
      }
    ]
  });
  next();
});

export default app;
