import React from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends React.Component {
  state = {
    // ingredients: null,
    totalPrice: 4,
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    // axios.get("http://localhost:8000/ingredients").then((response) => {//we can make error here
    //   this.setState({ ingredients: response.data });
    // }).catch(error=>{
    //   this.setState({error:true})
    // })
  }
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients cant be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.price}
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
//Hints:
//1:we should pass updated state to updatePurchaseState because in this function have the old state not the new state we removed or added
//2:if we want to pass two classes to element but one of them is fixed and another changed we can do this ->  [classes.Button,classes[props.btnType]].join(" ")
//3:if we want responsive the img or other elements in component we can use any property to set in component and every where we pass the value to it
//4:we always should use the capitalize name for class component but in functional we can use both of them
//5:always we should use prevstate in useState when we want to update the state beacause the useState method is asynchronous
//6:if we use module.css the classNames are unique (if we want to use activee class we shouls set in activeClassName -> activeClassName={classes.active})
//7:we can use exact keyword in Link to seprate the links its very useful for adding active class to them
//8:we can use .trim() to delete the spaces around string
//9 if we want to check that input not empty -> value=value.trim() !== ""
//10:if we have more than 1 condition that mights be not working we can do this: use && isValid(true || false)
//ex::::
// let isValid = true;
// if (rules.required) {
//   isValid = value.trim() !== "" && isValid
// }
// if(rules.minLength){
//     isValid=value.length >=rules.minLength && isValid
// }
// if(rules.maxLength){
//   isValid=value.length <=rules.maxLength && isValid
// }
//11:we should always put Provider outside of anythings(Redux)   <Provider>...........</Provider>

//--------------------------------------------------Additional Codes------------------------------
// ingredients: {
//   salad: 0,
//   bacon: 0,
//   cheese: 0,
//   meat: 0,
// }
