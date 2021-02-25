export const fetchListAction = "FETCH_LIST_ACTION";
export const fetchListActionSuccess = "FETCH_LIST_ACTION_SUCCESS";
export const fetchListActionError = "FETCH_LIST_ACTION_ERROR";

export const addTaskAction = "ADD_TASK_ACTION";
export const addTaskActionSuccess = "ADD_TASK_ACTION_SUCCESS";
export const addTaskActionError = "ADD_TASK_ACTION_ERROR";

export const loginAction = "LOGIN_ACTION";
export const loginActionSuccess = "LOGIN_ACTION_SUCCESS";
export const loginActionError = "LOGIN_ACTION_ERROR";

export const logoutAction = "LOGOUT_ACTION";

export const editTaskAction = "EDIT_TASK_ACTION";
export const editTaskActionSuccess = "EDIT_TASK_ACTION_SUCCESS";
export const editTaskActionError = "EDIT_TASK_ACTION_ERROR";

export const fetchList = (
  page: number,
  sortType: string,
  sortDirection: string
) => {
  return { type: fetchListAction, page, sortType, sortDirection };
};

export const fetchListSuccess = (data: any) => {
  return { type: fetchListActionSuccess, data };
};

export const fetchListError = (data: any) => {
  return { type: fetchListActionError, error: data };
};

export const addTask = (data: any) => ({
  type: addTaskAction,
  data,
});

export const addTaskSuccess = (data: any) => ({
  type: addTaskActionSuccess,
  data,
});

export const addTaskError = (error: any) => ({
  type: addTaskActionError,
  data: error,
});

export const login = (data: any) => ({
  type: loginAction,
  data,
});

export const loginSuccess = (data: any) => ({
  type: loginActionSuccess,
  data,
});

export const loginError = (data: any) => ({
  type: loginActionError,
  data,
});

export const logout = () => ({
  type: logoutAction,
});

export const editTask = (data: any) => ({
  type: editTaskAction,
  data,
});

export const editTaskSuccess = (data: any) => ({
  type: editTaskActionSuccess,
  data,
});

export const editTaskError = (data: any) => ({
  type: editTaskActionError,
  data,
});
