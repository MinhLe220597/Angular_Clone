
export class UserInfo {
  id?: string;
  code?: string;
  profileName?: string;
  orgStructureName?: string;
  profileID?: string;
  userLogin?: string;
  password?: string;
  permission?: string;
  note?: string;
  isActive?: boolean;
  isActiveView?: string;
  image?: string;
  userCreate?: string;
  dateCreate?: Date;
  userUpdate?: string;
  dateUpdate?: Date;
  token?: string;
}

export class UserInfoLogin {
  data!: UserInfo;
  message?: string;
  status?: string;
}
