import * as RedisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { UserModule } from './users';
import { AuthModule } from './auth';

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
})
export class AppModule {}
