import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, ObjectLiteral, Repository } from 'typeorm';
import { IUser } from '../interface';
import { UserEntity } from '../user.entity';

@Injectable()
export class UserServiceQueries {
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

  async addUser(user: Omit<IUser, 'id'>) {
    const query = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([user])
      .returning('*')
      .execute();
    return query.generatedMaps[0] as UserEntity;
  }

  async softDeleteUser(user: UserEntity) {
    const query = await this.userRepository.softRemove(user);
    return query;
  }
}
