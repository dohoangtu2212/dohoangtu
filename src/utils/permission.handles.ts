import { DEFAULT_PERMISSION } from "@/constants/permission";
import { PERMISSION_ROUTES } from "@/constants/route";
import { DB_KEY } from "@/store/apis/db";
import {
  IObjectPermission,
  IPermissionMapData,
  IUpdatePermissionsReq,
  IUpdatePermissionsRes,
  UserRole,
} from "@/types/permission";
import {
  Database,
  DatabaseReference,
  child,
  get,
  query,
  ref,
  update,
} from "firebase/database";

async function getPermission(
  dbRef: DatabaseReference
): Promise<IObjectPermission> {
  const snapshot = await get(query(child(dbRef, `${DB_KEY.permissions}`)));

  if (snapshot.exists()) {
    const data = snapshot.val() as IObjectPermission;
    return data;
  } else {
    return DEFAULT_PERMISSION;
  }
}

async function getPermissionMapData(
  dbRef: DatabaseReference
): Promise<IPermissionMapData> {
  const snapshot = await get(
    query(child(dbRef, `${DB_KEY.permissions}/mapData`))
  );

  if (snapshot.exists()) {
    const data = snapshot.val() as IPermissionMapData;
    return data;
  } else {
    return DEFAULT_PERMISSION.mapData;
  }
}

async function createAndUpdate(
  db: Database,
  data: IUpdatePermissionsReq
): Promise<IUpdatePermissionsRes> {
  let result: IUpdatePermissionsRes;

  const updates: { [key: string]: any } = {};

  updates[`/${DB_KEY.permissions}`] = data;
  await update(ref(db), updates);

  result = data;
  return result;
}

const getPermissionsByRole = (
  role: UserRole,
  mapData: IPermissionMapData
): string[] => {
  return Object.entries(mapData)
    .filter(([_, roles]) => roles.includes(role))
    .map(([key]) => key);
};

const getRoutesFromPermissions = (permissions: string[]): string[] => {
  return permissions
    .map((permission) => PERMISSION_ROUTES[permission])
    .filter(Boolean);
};

export const PermissionHandles = {
  getPermission,
  getPermissionMapData,
  createAndUpdate,
  getPermissionsByRole,
  getRoutesFromPermissions,
};
