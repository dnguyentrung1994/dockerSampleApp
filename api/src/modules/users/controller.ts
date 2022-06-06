import { Controller, Get, HttpStatus, Logger, Req, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ILoginRequest } from '../auth/interface';
import { UserService } from './services';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Get('profile')
  getProfile(@Req() req: ILoginRequest, @Res() res: FastifyReply) {
    return res.status(HttpStatus.OK).send(req.user);
  }

  @Get('hello')
  helloUser(@Res() res: FastifyReply) {
    return res.status(HttpStatus.OK).send({ message: 'hello' });
  }
}
