import { UserInfoDTO } from '../dto';
import { UserEntity } from '../user.entity';

export function mapUserEntityToUserInfoDTO(
  userEntity: UserEntity,
): UserInfoDTO {
  const { firstName, lastName, username, email } = userEntity;
  return {
    firstName,
    lastName,
    username,
    email: email,
  };
}
