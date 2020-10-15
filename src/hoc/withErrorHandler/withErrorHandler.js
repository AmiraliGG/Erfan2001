import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary";
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.reqInterceptor=axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      },error=>console.log(error+"request"));
      this.resInterceptor=axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
          console.log(error+"response")
        }
      );
    }
    componentWillUnmount(){
      axios.delete(this.reqInterceptor);
      axios.delete(this.resInterceptor);
    }
    errorConfirmHandler=()=> {
      this.setState({ error: null });
    }
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default withErrorHandler;
//Hints:
//1- Weshould use unmounting if it mounting will be finished -> in classs-based we should use componentWillUnmount but in functional component we should write code in the return of useEffect
//2- We use axios.interceptors.use to make the req & res but in axios.interceptors.eject we remove the req and res that we get it
