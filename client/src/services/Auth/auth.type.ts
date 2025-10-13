export type TRole = "USER" | "ADMIN";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  picture: string;
  isDeleted: boolean;
  isActive: string;
  isVerified: boolean;
  role: TRole;
  auths: Auth[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Auth {
  provider: string;
  providerId: string;
}

// login response type
export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}