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
  mobileNumber: string;
  address: string;
  website: string;
}

export interface IAddSellerPayload extends Omit<ISellerDetails, "id"> {
  type: string;
}

export interface IAddAccessoryBasePayload {
  type: string;
  name: string;
  categoryId: number;
  deviceModelId: number;
  brandId: number;
  masterAttributes: IKeyValuePair<string, string[]>[];
}

export interface IAddAccessoryVariantPayload {
  type: string;
  description: string;
  sellerPrice: number;
  abcPrice: number;
  specifications: string[];
  inBoxItems: string[];
  itemAttributes: Record<string,string>;
  availableCount: number;
  sellerIds: number[];
  accessoryBaseId: string;
}

export interface IBaseImage {
  altText: string;
  source: string;
  order: number;
}

export interface ICategoryDetails extends IBaseImage {
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
