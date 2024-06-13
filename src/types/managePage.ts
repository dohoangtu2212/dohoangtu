export interface IntroductionFormValues {
  introduceTextFirst: string;
  introduceTextSecond: string;
  introduceTextThird: string;
  description: string;
}

export interface CommitFormValues {
  introVideo: string;
  commits: ICommit[];
}

export interface LessonFormValues {
  lessons: ILesson[];
}

export interface ReviewFormValues {
  reviews: IReview[];
}

export interface IManagePageReq {
  introduceTextFirst: string;
  introduceTextSecond: string;
  introduceTextThird: string;
  description: string;
  introVideo: string;
  commits: ICommit[];
  lessons: ILesson[];
  reviews: IReview[];
}

export interface IManagePageRes {
  id: string;
  introduceTextFirst: string;
  introduceTextSecond: string;
  introduceTextThird: string;
  description: string;
  introVideo: string;
  commits: ICommit[];
  lessons: ILesson[];
  reviews: IReview[];
}

export interface ICommit {
  id?: string;
  title: string;
  image?: File;
  imageUrl?: string;
  imageName?: string;
}

export interface ILesson {
  id?: string;
  title: string;
  description: string;
  videoUrl: string;
  videoMobileUrl: string;
}

export interface IReview {
  id?: string;
  image?: File;
  imageUrl?: string;
  imageName?: string;
}
