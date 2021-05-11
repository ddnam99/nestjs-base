export interface IToken {
  accessToken: string;
  userId: string;
  expires: Date;
  refreshToken: string;
  expiresRefresh: Date;
}