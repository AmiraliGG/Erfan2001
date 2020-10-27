import {takeEvery,all,takeLatest} from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import {logoutSaga,checkAuthTimeout,authUserSaga,authCheckState} from"./auth";
import {initIngredientsSaga} from "./burgerBuilder";
import {purchaseBurgerSaga,fetchOrdersSaga} from "./order";
export function* watchAuth(){
    yield all([
        takeEvery(actionTypes.AUTH_INITIAL_LOGOUT,logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeout),
        takeEvery(actionTypes.AUTH_USER,authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE,authCheckState)
    ])
    // yield takeEvery(actionTypes.AUTH_INITIAL_LOGOUT,logoutSaga)
    // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeout)
    // yield takeEvery(actionTypes.AUTH_USER,authUserSaga)
    // yield takeEvery(actionTypes.AUTH_CHECK_STATE,authCheckState)
    
}
export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INIT_INGREDIENTS,initIngredientsSaga)
}
export function* watchOrder(){
    yield takeLatest(actionTypes.PURCHASE_BURGER,purchaseBurgerSaga)
    yield takeEvery(actionTypes.PURCHASE_ORDERS,fetchOrdersSaga)
}