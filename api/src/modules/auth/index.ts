import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { UserModule } from '../users';
import { LocalStrategy } from './auth-strategy/local.strategy';
import { AuthController } from './controller';
import { AuthService } from './services';
import { UserServiceQueries } from '../users/services/queries';
import { AuthServiceJWTHandler } from './services/jwtHandler';
import { AccessJwtStrategy } from './auth-strategy/accessJwt.strategy';
import { RefreshJwtStrategy } from './auth-strategy/refreshJwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AccessJwtStrategy,
    RefreshJwtStrategy,
    UserServiceQueries,
    Logger,
    AuthServiceJWTHandler,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
