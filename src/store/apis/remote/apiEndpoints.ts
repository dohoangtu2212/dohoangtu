const AUTH_PATH = "/auth";
const USER_PATH = "/user";
const REGISTER_TEACHER_PATH = "/register-teacher";
const MANAGE_PAGE_PATH = "/manage-page";

const AUTH = {
  REGISTER: {
    url: `${AUTH_PATH}/register`,
  },
};

const USER = {
  CREATE: {
    url: `${USER_PATH}/create`,
  },
  GET: {
    url: `${USER_PATH}/get`,
  },
  GETS: {
    url: `${USER_PATH}/gets`,
  },
  DISABLE: {
    url: `${USER_PATH}/disable`,
  },
  UPDATE: {
    url: `${USER_PATH}/update`,
  },
  UPDATE_INFO: {
    url: `${USER_PATH}/update-info`,
  },
  DELETE: {
    url: `${USER_PATH}/delete`,
  },
  DELETES: {
    url: `${USER_PATH}/deletes`,
  },
};

const REGISTER_TEACHER = {
  CREATE: {
    url: `${REGISTER_TEACHER_PATH}/create`,
  },
  GETS: {
    url: `${REGISTER_TEACHER_PATH}/gets`,
  },
  DELETES: {
    url: `${REGISTER_TEACHER_PATH}/deletes`,
  },
  SEENS: {
    url: `${REGISTER_TEACHER_PATH}/seens`,
  },
  APPROVE: {
    url: `${REGISTER_TEACHER_PATH}/approve`,
  },
};

const MANAGE_PAGE = {
  GET: {
    url: `${MANAGE_PAGE_PATH}/get`,
  },
  UPDATE_INTRODUCTION: {
    url: `${MANAGE_PAGE_PATH}/update-introduction`,
  },
  UPDATE_COMMIT: {
    url: `${MANAGE_PAGE_PATH}/update-commit`,
  },
  UPDATE_LESSON: {
    url: `${MANAGE_PAGE_PATH}/update-lesson`,
  },
  UPDATE_REVIEW: {
    url: `${MANAGE_PAGE_PATH}/update-review`,
  },
};

const ApiEndpoints = {
  AUTH,
  USER,
  REGISTER_TEACHER,
  MANAGE_PAGE,
};

export default ApiEndpoints;
