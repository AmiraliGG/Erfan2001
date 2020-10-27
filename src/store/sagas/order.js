import { func } from "prop-types";
import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios-orders";
export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "/orders?auth=" + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}
export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParams =
    "?auth=" + action.token + "&orderBy='userId'&equalTo='" + action.userId + "'";
  // console.log(getState().auth.token) ///    really important
  try {
    const response = yield axios.get("/orders" + queryParams);
    const fetchOrders = [];
    for (let key in response.data) {
      if (action.userId === response.data[key].userId) {
        fetchOrders.push({ ...response.data[key], id: key });
      }
    }
    yield put(actions.fetchOrdersSuccess(fetchOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
