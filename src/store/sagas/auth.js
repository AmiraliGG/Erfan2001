import { put,call } from "redux-saga/effects";
import { delay } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/index";
export function* logoutSaga(action) {
  yield call([localStorage,"removeItem"],"token")
  yield call([localStorage,"removeItem"],"experationDate")
  yield call([localStorage,"removeItem"],"userId")
  //--------------------------------------------------------------
  // yield localStorage.removeItem("token");
  // yield localStorage.removeItem("experationDate");
  // yield localStorage.removeItem("userId");
  //--------------------------------------------------------------

  yield put(actions.logoutSucceed()); //important : we should call it
}
// put ->//use for dispatching action

export function* checkAuthTimeout(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout()); //important : we should call it
}

export function* authUserSaga(action) {
  put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
    id: action.id,
  };
  let url = "http://localhost:3000/register";
  if (!action.isSignup) {
    url = "http://localhost:3000/login";
  }
  try {
    const response = yield axios.post(url, authData);
    const experationDate = yield new Date(new Date().getTime() + 3600 * 1000);
    yield localStorage.setItem("token", response.data.accessToken);
    yield localStorage.setItem("experationDate", experationDate);
    yield localStorage.setItem("userId", action.id);
    yield put(actions.authSuccess(response.data.accessToken, action.id));
    yield put(actions.checkAuthTimeout(3600));
  } catch (error) {
    yield put(actions.authFail(error.response.data));
  }
}

export function* authCheckState(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const experationDate = yield new Date(
      localStorage.getItem("experationDate")
    );
    if (experationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (experationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
