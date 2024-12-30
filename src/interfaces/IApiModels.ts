export interface IUserData {
  firstName: string;
  avatarUrl: string;
  accessibleModules: string[];
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

export interface IItemsList {
  id: number;
  name: string;
  description: string;
  price: string;
  imageURLs: string[];
}
