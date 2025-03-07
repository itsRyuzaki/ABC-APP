import { UserRole } from "../enums/UserRoleEnum";

export interface IUserData {
  firstName: string;
  avatarUrl: string;
  accessibleModules: string[];
  userRole: UserRole;
}

export interface IUserLoginPayload {
  userName: string;
  password: string;
}

export interface IUserSignUpPayload {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  emailId: string;
}

export interface ISellerDetails {
  id: number;
  name: string;
}


export interface IKeyValuePair<K,V> {
  id?: string;
  key: K;
  value: V;
}