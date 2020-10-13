import axios from "axios";
import * as actionTypes from "./actionTypes";
export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}
export const authSuccess=(token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}
export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const logout=()=>{
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout=(expirationTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime * 1000)
    }
}
export const auth=(email,password,isSignup,id)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true,
            id:id
        };
        let url="http://localhost:3000/register";
        if(!isSignup){
            url="http://localhost:3000/login";
        }
        axios.post(url,authData).then(response=>{
            console.log(response)
            dispatch(authSuccess(response.data.accessToken,id))
            dispatch(checkAuthTimeout(3600))
        }).catch(err=>{
            console.log(err.response.data)
            dispatch(authFail(err.response.data))
        })
    }
}
