import React from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends React.Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders")
      .then((res) => {
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({ ...res.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchOrders });
      })
      .catch((error) => this.setState({ loading: false }));
  }
  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
  }
}
export default WithErrorHandler(Orders, axios);