import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, ObjectLiteral, Repository } from 'typeorm';
import { UserRegisterDTO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(
    filter?:
      | string
      | ObjectLiteral
      | FindConditions<UserEntity>
      | FindConditions<UserEntity>[],
  ): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: filter,
    });
  }

  async getUser(
    filter?:
      | string
      | ObjectLiteral
      | FindConditions<UserEntity>
      | FindConditions<UserEntity>[],
  ): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: filter });
  }

  async addUser(userDTO: UserRegisterDTO) {
    const query = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([userDTO])
      .returning('*')
      .execute();
    return query.generatedMaps[0] as UserEntity;
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
    return await this.getUser(filter).then(async (result) => {
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
        const deleted = await this.userRepository.softRemove(result);
        return {
          status: 'SUCCEEDED',
          context: deleted,
        };
      }
    });
  }
}
