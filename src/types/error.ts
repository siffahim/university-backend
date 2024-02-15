export type IErrorMessages = {
  path: string;
  message: string;
};

export type IErrorMessageResponse = {
  statusCode: number;
  message: string;
  errorMessages: IErrorMessages[];
};
