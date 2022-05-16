import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { JwtAuthGuard } from '../auth/auth-guard/jwt.guard';
import { ILoginRequest } from '../auth/interface';
import { hashPassword } from '../auth/utils';
import { UserRegisterDTO } from './dto';
import { UserService } from './services';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: ILoginRequest) {
    return req.user;
  }

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
