import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { configService } from 'src/config/config.service';
import { UserInfoDTO } from 'src/modules/users/dto';
import { mapUserEntityToUserInfoDTO } from 'src/modules/users/services/mapper';
import { ITokenPayload } from '../interface';
import { AuthService } from '../services';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request.headers.authorization ?? '';
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getAccessJWTSettings().privateKey,
    });
  }

  async validate(payload: ITokenPayload): Promise<UserInfoDTO> {
    try {
      const user = await this.authService.validateViaJwtToken(payload);
      if (!user) throw new BadRequestException('ユーザー情報不正');
      return mapUserEntityToUserInfoDTO(user);
    } catch (error) {
      throw error;
    }
  }
}
