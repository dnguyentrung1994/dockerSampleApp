import { Injectable } from '@nestjs/common';
import { FindConditions, ObjectLiteral } from 'typeorm';
import { UserInfoDTO, UserRegisterDTO } from '../dto';
import { IUser } from '../interface';
import { UserEntity } from '../user.entity';
import { mapUserEntityToUserInfoDTO } from './mapper';
import { UserServiceQueries } from './queries';

@Injectable()
export class UserService {
  constructor(private readonly userServiceQueries: UserServiceQueries) {}

  async getUsers(
    filter?:
      | string
      | ObjectLiteral
      | FindConditions<UserEntity>
      | FindConditions<UserEntity>[],
  ): Promise<UserInfoDTO[]> {
    return (await this.userServiceQueries.getUsers(filter)).map((user) =>
      mapUserEntityToUserInfoDTO(user),
    );
  }

  async getUser(
    filter?:
      | string
      | ObjectLiteral
      | FindConditions<UserEntity>
      | FindConditions<UserEntity>[],
  ): Promise<UserInfoDTO | undefined> {
    const user = await this.userServiceQueries.getUser(filter);
    if (!user) return;
    return mapUserEntityToUserInfoDTO(user);
  }

  async addUser(user: Omit<IUser, 'id'>): Promise<UserEntity> {
    return await this.userServiceQueries.addUser(user);
  }

  async deleteUser(
    filter:
      | string
      | ObjectLiteral
      | FindConditions<UserEntity>
      | FindConditions<UserEntity>[],
  ): Promise<{
    status: 'NOT_FOUND' | 'ARD_DELETED' | 'SUCCEEDED';
    context?: any;
  }> {
    return await this.userServiceQueries
      .getUser(filter)
      .then(async (result) => {
        if (!result) {
          return {
            status: 'NOT_FOUND',
          };
        } else if (result?.deletedAt) {
          return {
            status: 'ARD_DELETED',
            context: result,
          };
        } else {
          const deleted = await this.userServiceQueries.softDeleteUser(result);
          return {
            status: 'SUCCEEDED',
            context: deleted,
          };
        }
      });
  }
}
