export enum UserRole {
  student = "student",
  teacher = "teacher",
  admin = "admin",
}

export interface IUserPermission {
  codes: string[];
  routes: string[];
}

export interface IGroupPermission {
  id?: string;
  code: string;
  name: string;
  children: IPermission[];
  hidden?: boolean;
}

export interface IPermission {
  id?: string;
  code: string;
  name: string;
  description: string;
  roles?: UserRole[];
  disabledStudent?: boolean;
  disabledTeacher?: boolean;
}

export interface IPermissionMapData {
  [key: string]: UserRole[];
}

export interface IObjectPermission {
  data: IGroupPermission[];
  mapData: IPermissionMapData;
}

export interface IUpdatePermissionsRes extends IObjectPermission {}

export interface IUpdatePermissionsReq extends IObjectPermission {}
