import { createApi } from "@reduxjs/toolkit/query/react";
import { fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storageApis = createApi({
  reducerPath: "storage",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    uploadCourseThumbnail: build.mutation<
      { url: string },
      { filePath: string; file: File }
    >({
      async queryFn({ filePath, file }) {
        try {
          const storage = getStorage();

          const fileRef = ref(storage, `thumbnail/${filePath}`);
          await uploadBytes(fileRef, file);
          const url = await getDownloadURL(fileRef);
          return { data: { url } };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [],
    }),
  }),
});

export const { useUploadCourseThumbnailMutation } = storageApis;
export default storageApis;
