export enum UserType {
  Tourist = 'tourist',
  Local = 'local',
}

export type User = {
  id: string;
  name: string;
  email: string;
  type: UserType;
}