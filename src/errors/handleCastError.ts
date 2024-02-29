import mongoose from 'mongoose';
import { IErrorMessageResponse, IErrorMessages } from '../types/error';

const handleCastError = (
  error: mongoose.Error.CastError
): IErrorMessageResponse => {
  const errors: IErrorMessages[] = [
    {
      path: error?.path,
      message: 'Invalid Id'
    }
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors
  };
};

export default handleCastError;
