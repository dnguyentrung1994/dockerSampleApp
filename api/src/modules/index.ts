import * as RedisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { UserModule } from './users';
import { AuthModule } from './auth';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/auth-guard/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CacheModule.register({
      store: RedisStore,
      host: configService.getRedisSetting().host,
      port: configService.getRedisSetting().port,
      ttl: configService.getRedisSetting().ttl,
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
