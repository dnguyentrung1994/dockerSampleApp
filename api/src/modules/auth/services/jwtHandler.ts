import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { configService } from '../../../config/config.service';
import { IJwtToken, ITokenPayload } from '../interface';

@Injectable()
export class AuthServiceJWTHandler {
  constructor(private readonly jwtService: JwtService) {}

  generateJwtToken(username): IJwtToken {
    const payload: ITokenPayload = { username };
    const accessJwtConfig = configService.getAccessJWTSettings();
    const refreshJwtConfig = configService.getRefreshJWTSettings();
    const refreshToken = this.jwtService.sign(payload, {
      privateKey: refreshJwtConfig.privateKey,
      expiresIn: refreshJwtConfig.expireIn,
      secret: refreshJwtConfig.privateKey,
    });
    const accessToken = this.jwtService.sign(payload, {
      privateKey: accessJwtConfig.privateKey,
      expiresIn: accessJwtConfig.expireIn,
      secret: accessJwtConfig.privateKey,
    });
    return { refreshToken, accessToken };
  }
}
