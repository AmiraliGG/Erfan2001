import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const purchaseBurgerSuccess=(id,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}
export const purchaseBurgerFail=(error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger=(orderData,token)=>{
    return (dispatch)=>{
        dispatch(purchaseBurgerStart())
        axios
        .post("/orders?auth="+token, orderData)
        .then((response) => {
            console.log(response.data,"erfan")
          dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        })
        .catch((error) => {
         dispatch(purchaseBurgerFail(error))
        });
    }
}
export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}
export const fetchOrdersSuccess=(orders)=>{
    return{
        type:actionTypes.PURCHASE_ORDERS_SUCCESS,
        orders:orders
    }
}
export const fetchOrdersFail=(error)=>{
    return{
        type:actionTypes.PURCHASE_ORDERS_FAIL,
        error:error
    }
}
export const fetchOrdersStart=()=>{
    return{
        type:actionTypes.PURCHASE_ORDERS_START
    }
}
export const fetchOrders=(token,userId)=>{
    return (dispatch,getState)=>{
        dispatch(fetchOrdersStart())
        const queryParams="?auth="+token + "&orderBy='userId'&equalTo='"+userId + "'";
        // console.log(getState().auth.token) ///    really important
    axios
    .get("/orders"+queryParams)
    .then((res) => {
      const fetchOrders = [];
      for (let key in res.data) {
          if(userId===res.data[key].userId){//az khodame   malee khodammeee :))))))))))))))))))))
        fetchOrders.push({ ...res.data[key], id: key });
      }
    }
      dispatch(fetchOrdersSuccess(fetchOrders))
    })
    .catch((error) => dispatch(fetchOrdersFail(error)));
}
}