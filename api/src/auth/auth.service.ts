import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { comparePassword } from './auth.utils';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<UserEntity, 'password'> | undefined> {
    const user = await this.userService.getUser({ username });
    if (!user) return undefined;
    if (await comparePassword(pass, user.password)) {
      const { password: _, ...result } = user;
      return result;
    }
    return undefined;
  }
}
