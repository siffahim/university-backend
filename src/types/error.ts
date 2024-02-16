export type IErrorMessages = {
  path: string | number;
  message: string;
};

export type IErrorMessageResponse = {
  statusCode: number;
  message: string;
  errorMessages: IErrorMessages[];
};
