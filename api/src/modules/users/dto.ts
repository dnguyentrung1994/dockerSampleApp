import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IRegisterUser } from './interface';

export class UserRegisterDTO implements IRegisterUser {
  @ApiProperty({ description: 'first name ' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'last name ' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'user name' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'user password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'user password' })
  @IsOptional()
  @IsEmail()
  email?: string | undefined;

  @ApiProperty({ description: 'user password' })
  @IsOptional()
  @IsString()
  address?: string | undefined;

  @ApiProperty({ description: 'user password' })
  @IsOptional()
  @IsMobilePhone(['ja-JP'])
  telephone?: string | undefined;

  @ApiProperty({ description: 'admin authentication' })
  @IsOptional()
  adminAuth?: string;
}

export class UserLoginDTO extends PickType(UserRegisterDTO, [
  'username',
  'password',
]) {}

export class UserInfoDTO extends OmitType(UserRegisterDTO, [
  'password',
  'adminAuth',
]) {}
