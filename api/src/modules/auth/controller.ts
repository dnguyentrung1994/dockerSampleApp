import {
  Controller,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { LocalAuthGuard } from './auth-guard/local.guard';
import { ILoginRequest } from './interface';
import { AuthService } from './services';
import { Public } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() req: ILoginRequest,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const user = req.user;
      const tokens = this.authService.login(user);
      return res.status(HttpStatus.OK).send(tokens);
    } catch (error) {
      throw error;
    }
  }
}
