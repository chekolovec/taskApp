import {
  addTaskAction,
  addTaskActionError,
  addTaskActionSuccess,
  editTaskActionSuccess,
  fetchListAction,
  fetchListActionSuccess,
  loginActionError,
  loginActionSuccess,
  logoutAction,
} from "../actions";

const initialState = {
  loading: false,
  addError: {
    email: "",
    text: "",
    username: "",
  },
  addedNew: false,
  page: 1,
  data: {
    tasks: [],
    total_task_count: 0,
  },
  authError: {
    username: "",
    password: "",
  },
  authToken: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: any) => {
  const { addedNew } = state;
  switch (action.type) {
    case fetchListAction:
      return {
        ...state,
        loading: true,
      };
    case fetchListActionSuccess:
      return {
        ...state,
        loading: false,
        data: action?.data,
      };
    case addTaskAction:
      return {
        ...state,
        loading: true,
      };
    case addTaskActionSuccess:
      return {
        ...state,
        loading: false,
        addedNew: !addedNew,
        addError: initialState.addError,
      };
    case addTaskActionError:
      return {
        ...state,
        addError: action.data,
      };
    case loginActionSuccess:
      return {
        ...state,
        authToken: action.data.token,
        authError: initialState.authError,
      };
    case loginActionError:
      return {
        ...state,
        authError: action.data,
      };
    case logoutAction:
      return {
        ...state,
        authToken: initialState.authToken,
      };
    case editTaskActionSuccess:
      return {
        ...state,
        addedNew: !addedNew,
      };
    default:
      return state;
  }
};
