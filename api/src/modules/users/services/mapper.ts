import { UserInfoDTO } from '../dto';
import { UserEntity } from '../user.entity';

export function mapUserEntityToUserInfoDTO(
  userEntity: UserEntity,
): UserInfoDTO {
  const { firstName, lastName, username, email, address, telephone } =
    userEntity;
  return {
    firstName,
    lastName,
    username,
    email: email ?? undefined,
    address: address ?? undefined,
    telephone: telephone ?? undefined,
  };
}
