import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../users/user.entity';
import { IRegisterUser } from '../../users/interface';
import { comparePassword } from '../utils';
import { UserServiceQueries } from 'src/modules/users/services/queries';
import { ITokenPayload } from '../interface';
import { AuthServiceJWTHandler } from './jwtHandler';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServiceQueries: UserServiceQueries,
    private readonly jwtHandler: AuthServiceJWTHandler,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<UserEntity, 'password'> | undefined> {
    const user = await this.userServiceQueries.getUser({ username });
    if (!user) return undefined;
    if (await comparePassword(pass, user.password)) {
      const { password: _, ...result } = user;
      return result;
    }
    return undefined;
  }

  async validateViaJwtToken(
    token: ITokenPayload,
  ): Promise<UserEntity | undefined> {
    const { username } = token;
    return await this.userServiceQueries.getUser({ username });
  }

  async login(user: IRegisterUser) {
    return await this.jwtHandler.generateJwtToken(user.username);
  }
}
