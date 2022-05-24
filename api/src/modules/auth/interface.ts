import { IUser } from '../users/interface';
import { FastifyRequest } from 'fastify';

export interface IToken {
  username: string;
  exp: number;
  iat: number;
}
export interface ITokenPayload {
  username: string;
}

export interface ILoginRequest extends FastifyRequest {
  user: IUser;
}

export interface IJwtToken {
  refreshToken: string;
  accessToken: string;
}
