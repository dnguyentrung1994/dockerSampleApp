import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../users/user.entity';
import { IRegisterUser } from '../../users/interface';
import { comparePassword, hashPassword } from '../utils';
import { UserServiceQueries } from 'src/modules/users/services/queries';
import { ITokenPayload } from '../interface';
import { AuthServiceJWTHandler } from './jwtHandler';
import { UserRegisterDTO } from 'src/modules/users/dto';
import { mapUserEntityToUserInfoDTO } from 'src/modules/users/services/mapper';
import { configService } from 'src/config/config.service';
import { Cache } from 'cache-manager';
import { getUnixTime } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServiceQueries: UserServiceQueries,
    private readonly jwtHandler: AuthServiceJWTHandler,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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

  login(user: IRegisterUser) {
    return this.jwtHandler.generateJwtToken(user.username);
  }

  async registerUser({
    firstName,
    lastName,
    username,
    password,
    email,
    address,
    telephone,
    adminAuth,
  }: UserRegisterDTO): Promise<{
    status:
      | 'NO_CONTACT'
      | 'USER_EXISTS'
      | 'ADMIN_VERIFICATION_INVALID'
      | 'CREATED';
    context?: any;
  }> {
    try {
      const context: any = {};
      if (!email && !address && !telephone)
        return {
          status: 'NO_CONTACT',
        };

      if (await this.userServiceQueries.getUser({ username }))
        return {
          status: 'USER_EXISTS',
        };

      if (adminAuth) {
        if (adminAuth !== configService.getAdminVerification()) {
          return {
            status: 'ADMIN_VERIFICATION_INVALID',
          };
        } else {
          context.isAdmin = true;
        }
      }
      const hashedPassword = await hashPassword(password);
      const newUser = await this.userServiceQueries.addUser({
        firstName,
        lastName,
        username,
        password: hashedPassword,
        email,
        address,
        telephone,
      });
      context.tokens = this.login(newUser);
      context.userInfo = mapUserEntityToUserInfoDTO(newUser);
      return {
        status: 'CREATED',
        context,
      };
    } catch (error) {
      throw error;
    }
  }

  async blockJwt(jwt: string, exp: number) {
    const ttl = exp - getUnixTime(new Date());
    await this.cacheManager.set(`BLOCKED_JWT_${jwt}`, true, {
      ttl,
    });
  }
}
