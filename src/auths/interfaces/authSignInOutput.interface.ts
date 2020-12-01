export interface IAuthSignInOutput {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // for access token
}
