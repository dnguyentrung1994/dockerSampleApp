import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { hashPassword } from 'src/auth/auth.utils';
import { UserRegisterDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async createUser(
    @Body() userData: UserRegisterDTO,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const userPrompt = await this.userService.getUser({
        username: userData.username,
      });
      if (userPrompt)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
          message: 'user already exists',
        });
      const hashedPassword = await hashPassword(userData.password);
      const newUser = await this.userService.addUser({
        ...userData,
        password: hashedPassword,
      });
      return res.status(HttpStatus.OK).send(newUser);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
