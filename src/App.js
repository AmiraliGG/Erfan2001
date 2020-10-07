import React from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}
export default App;
//----------------------------------------REMOVING INTERCEPTORS----------------------------------
// class App extends React.Component {
//   state = {
//     show: true,
//   };
//   componentDidMount(){
//     setTimeout(()=>{
//       this.setState({show:false})
//     },5000)
//   }
//   render() {
//     return (
//       <div className="App">
//         <Layout>{this.state.show ? <BurgerBuilder /> : null}</Layout>
//       </div>
//     );
//   }
// }
//--------------------------------------------------------------------------------------------------
