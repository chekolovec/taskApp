// @ts-nocheck
import { call, put, takeLatest } from "redux-saga/effects";
import { API } from "../../api";

import {
  addTaskAction,
  addTaskError,
  addTaskSuccess,
  editTaskAction,
  editTaskError,
  editTaskSuccess,
  fetchListAction,
  fetchListError,
  fetchListSuccess,
  loginAction,
  loginError,
  loginSuccess,
} from "../actions";

function* fetchListSaga({
  page = 1,
  sortType = "username",
  sortDirection = "asc",
}) {
  try {
    const response = yield call(API.fetchList, page, sortType, sortDirection);
    if (response.status === "ok") {
      yield put(fetchListSuccess(response.message));
      return;
    }
    throw new Error(response.message);
  } catch (error) {
    yield put(fetchListError(error));
  }
}

function* addTaskSaga({ data }) {
  const { name, email, text } = data;
  try {
    const response = yield call(API.addTask, { name, email, text });
    if (response.status === "ok") {
      yield put(addTaskSuccess(response.message));
      return;
    }
    throw response.message;
  } catch (error) {
    yield put(addTaskError(error));
  }
}

function* loginSaga({ data }) {
  const { username, password } = data;
  try {
    const response = yield call(API.login, { username, password });
    if (response.status === "ok") {
      yield put(loginSuccess(response.message));
      return;
    }
    throw response.message;
  } catch (error) {
    yield put(loginError(error));
  }
}

function* EditTaskSaga({ data }) {
  const { text, ID, status, authToken } = data;
  try {
    const response = yield call(API.editTask, { text, ID, status, authToken });
    if (response.status === "ok") {
      yield put(editTaskSuccess(response.message));
      return;
    }
    throw response.message;
  } catch (error) {
    yield put(editTaskError(error));
  }
}

function* mainSaga() {
  yield takeLatest(fetchListAction, fetchListSaga);
  yield takeLatest(addTaskAction, addTaskSaga);
  yield takeLatest(loginAction, loginSaga);
  yield takeLatest(editTaskAction, EditTaskSaga);
}

export default mainSaga;
