import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const addIngredient=name=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}
export const removeIngredient=name=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}
export const setIngredients=ingredients=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}
export const fetchIngredientsFailed=()=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
    }
}
export const initIngredients=()=>{
    return dispatch=>{
    axios.get("http://localhost:3000/ingredients").then((response) => {//we can make error here
      dispatch(setIngredients(response.data))
    }).catch(error=>{
      dispatch(fetchIngredientsFailed())
    })
    }
}