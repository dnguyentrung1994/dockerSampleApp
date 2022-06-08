export interface UserState {
  accessToken?: string | undefined;
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}
