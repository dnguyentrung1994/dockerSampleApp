import {
  BadRequestException,
  Body,
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
import { ILoginRequest, IToken } from './interface';
import { AuthService } from './services';
import { Public } from './decorators';
import { UserRegisterDTO } from '../users/dto';
import jwtDecode from 'jwt-decode';
import { RefreshJWTGuard } from './auth-guard/refreshToken.guard';

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

      res.setCookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(HttpStatus.OK).send({
        message: 'Login successfully!',
        accessToken: tokens.accessToken,
        ...user,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Public()
  @Post('register')
  async register(
    @Body() userRegisterDTO: UserRegisterDTO,
    @Res() res: FastifyReply,
  ) {
    try {
      const registerResult = await this.authService.registerUser(
        userRegisterDTO,
      );

      if (registerResult.status !== 'CREATED')
        throw new BadRequestException(registerResult.status);

      res.setCookie(
        'refreshToken',
        registerResult.context.tokens.refreshToken,
        {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          path: 'api/refresh-token',
        },
      );
      return res.status(HttpStatus.OK).send({
        accessToken: registerResult.context.tokens.accessToken,
        userInfo: registerResult.context.userInfo,
      });
    } catch (error: any) {
      if (error.statusCode >= 500) this.logger.error(error);
      throw error;
    }
  }

  @Post('logout')
  async logout(@Req() req: ILoginRequest, @Res() res: FastifyReply) {
    try {
      const accessToken: IToken | undefined = req.headers.authorization
        ? jwtDecode(req.headers.authorization)
        : undefined;
      const refreshToken: IToken | undefined = req.cookies?.refreshToken
        ? jwtDecode(req.cookies.refreshToken)
        : undefined;

      if (accessToken)
        this.authService.blockJwt(
          req.headers.authorization ?? '',
          accessToken.exp,
        );
      if (refreshToken)
        this.authService.blockJwt(
          req.cookies.refreshToken ?? '',
          refreshToken.exp,
        );

      res.clearCookie('refreshToken', {
        path: 'api/refresh-token',
      });

      return res.status(HttpStatus.OK).send({
        message: 'Logged out',
      });
    } catch (error) {
      if (error.statusCode >= 500) this.logger.error(error);
      throw error;
    }
  }

  @Public()
  @UseGuards(RefreshJWTGuard)
  @Post('refresh')
  refreshTokens(@Req() req: ILoginRequest, @Res() res: FastifyReply) {
    try {
      const user = req.user;
      const tokens = this.authService.login(user);
      return res.status(HttpStatus.OK).send({
        ...tokens,
      });
    } catch (error) {
      if (error?.statusCode >= 500) console.error(error);
    }
  }
}
