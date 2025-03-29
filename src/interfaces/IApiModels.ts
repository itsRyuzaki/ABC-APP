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

export interface IBaseImage {
  altText: string;
  source: string;
  order: number;
}

export interface ICategoryDetails extends IBaseImage  {
  id: number;
  name: string;
  description: string;
  guid: string;
}

export interface IBrandDetails extends IBaseImage {
  id: number;
  name: string;
  guid: string;
  officialSite: string;
}

export interface IDeviceModels extends IBaseImage {
  id: number;
  name: string;
  description: string;
  guid: string;
}

export interface IKeyValuePair<K, V> {
  id?: string;
  key: K;
  value: V;
}
