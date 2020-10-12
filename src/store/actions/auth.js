import axios from "axios";
import * as actionTypes from "./actionTypes";
export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}
export const authSuccess=(authData)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        authData:authData
    }
}
export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const auth=(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        };
        let url="http://localhost:3000/register";
        if(!isSignup){
            url="http://localhost:3000/login";
        }
        axios.post(url,authData).then(response=>{
            console.log(response)
            dispatch(authSuccess(response.data.accessToken))
        }).catch(err=>{
            console.log(err)
            dispatch(authFail(err))
        })
    }
}
