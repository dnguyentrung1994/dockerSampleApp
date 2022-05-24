import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller';
import { UserEntity } from './user.entity';
import { UserService } from './services';
import { UserServiceQueries } from './services/queries';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserServiceQueries, Logger],
  exports: [UserService, UserServiceQueries],
})
export class UserModule {}
