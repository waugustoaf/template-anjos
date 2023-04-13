import {IUser} from "@/types/entities/IUser";
import {IProfile} from "@/types/entities/IProfile";

export type ListUsersResponse = IUser[];
export type CreateUserResponse = IUser;
export type GetUserResponse = IUser;
export type UpdateUserResponse = IUser;
export type MeResponse = IProfile
