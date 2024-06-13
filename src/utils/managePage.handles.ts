import { DB_KEY, Updates } from "@/store/apis/db";
import { IManagePageReq, IManagePageRes } from "@/types/managePage";
import {
  Database,
  DatabaseReference,
  child,
  get,
  push,
  query,
  ref,
  update,
} from "firebase/database";

async function getList(dbRef: DatabaseReference): Promise<IManagePageRes[]> {
  const snapshot = await get(query(child(dbRef, `${DB_KEY.managePage}`)));

  let resList: IManagePageRes[] = [];
  if (snapshot.exists()) {
    resList = Object.entries(snapshot.val()).map(([key, val]) => ({
      id: key,
      ...(val as any),
    })) as IManagePageRes[];
  }
  return resList;
}

async function createAndUpdate(
  db: Database,
  resList: IManagePageRes[],
  data: IManagePageReq
): Promise<IManagePageRes> {
  let result: IManagePageRes;

  const newManagePageKey = push(child(ref(db), DB_KEY.managePage)).key;
  const managePageKey = resList.length > 0 ? resList[0].id : newManagePageKey!;
  const updates: { [key: string]: any } = {};

  updates[`/${DB_KEY.managePage}/${managePageKey}`] = {
    introduceTextFirst: data.introduceTextFirst,
    introduceTextSecond: data.introduceTextSecond,
    introduceTextThird: data.introduceTextThird,
    description: data.description,
    introVideo: data.introVideo,
    commits: data.commits ?? [],
    lessons: data.lessons ?? [],
    reviews: data.reviews ?? [],
  };
  await update(ref(db), updates);

  result = {
    ...data,
    id: managePageKey,
  };
  return result;
}

async function updateSync(
  db: Database,
  snapshotData: IManagePageRes,
  createData: IManagePageReq
): Promise<IManagePageRes> {
  const updates: { [key: string]: any } = {};
  updates[`/${DB_KEY.managePage}/${snapshotData.id}`] = createData;

  await update(ref(db), updates);
  const resData: IManagePageRes = { ...createData, id: snapshotData.id };

  return resData;
}

async function createSync(
  db: Database,
  createData: IManagePageReq
): Promise<IManagePageRes> {
  const newKey = push(child(ref(db), DB_KEY.managePage)).key;
  const updates: Updates = {};

  updates[`/${DB_KEY.managePage}/` + newKey] = createData;
  update(ref(db), updates);
  const resData: IManagePageRes = { ...createData, id: newKey! };

  return resData;
}

export const ManagePageHandles = {
  getList,
  updateSync,
  createSync,
  createAndUpdate,
};
