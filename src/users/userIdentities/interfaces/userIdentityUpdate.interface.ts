import { IPasswordForgotToken } from './passwordForgotToken.interface';

export interface IUserIdentityUpdate {
  passwordHash?: string;
  activationCode?: string;
  isActive?: boolean;
  'tokens.passwordForgotToken'?: IPasswordForgotToken;
  'tokens.refreshToken'?: string;
}
