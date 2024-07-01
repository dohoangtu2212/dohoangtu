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
    introVideoName: data.introVideoName,
    introVideoUrl: data.introVideoUrl,
    thumbnailName: data.thumbnailName,
    thumbnailUrl: data.thumbnailUrl,
    trialLearnLink: data.trialLearnLink,
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

export const ManagePageHandles = {
  getList,
  createAndUpdate,
};
