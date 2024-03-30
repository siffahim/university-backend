export type IAuth = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  isChangePassword: boolean | undefined;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
