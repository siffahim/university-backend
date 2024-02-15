import mongoose from 'mongoose';
import { IErrorMessageResponse, IErrorMessages } from '../types/error';

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IErrorMessageResponse => {
  const errors: IErrorMessages[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors
  };
};

export default handleValidationError;
