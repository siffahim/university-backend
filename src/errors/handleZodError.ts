import { ZodError } from 'zod';
import { IErrorMessageResponse, IErrorMessages } from '../types/error';

const handleZodError = (error: ZodError): IErrorMessageResponse => {
  const errors: IErrorMessages[] = error.errors.map(el => {
    return {
      path: el.path[el.path.length - 1],
      message: el.message
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors
  };
};

export default handleZodError;
