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
    localStorage.removeItem("token")
    localStorage.removeItem("experationDate")
    localStorage.removeItem("userId")
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout=(expirationTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime *1000)
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
            const experationDate=new Date(new Date().getTime()+3600*1000);
            localStorage.setItem("token",response.data.accessToken)
            localStorage.setItem("experationDate",experationDate)
            localStorage.setItem("userId",id)
            dispatch(authSuccess(response.data.accessToken,id))
            dispatch(checkAuthTimeout(3600))
        }).catch(err=>{
            dispatch(authFail(err.response.data))
        })
    }
}

export const setAuthRedirectPath=path=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}
export const authCheckState=()=>{
    return dispatch =>{
        const token =localStorage.getItem("token");
        if(!token){
            dispatch(logout())
        }else{
            const experationDate=new Date(localStorage.getItem("experationDate"));
            if(experationDate <= new Date()){
                dispatch(logout())
            }else{
                const userId=localStorage.getItem("userId");
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((experationDate.getTime()-new Date().getTime())/1000))
            }
        }
    }
}