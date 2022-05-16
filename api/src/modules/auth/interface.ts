import { Request } from 'express';
import { IUser } from '../users/interface';

export interface ITokenPayload {
  username: string;
}

export interface ILoginRequest extends Request {
  user: IUser;
}

export interface IJwtToken {
  refreshToken: string;
  accessToken: string;
}
