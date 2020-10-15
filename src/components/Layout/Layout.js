import React from 'react';
import {connect} from "react-redux";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
class Layout extends React.Component{
    state={
        showSideDrawer:false
    }
    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:!this.state.showSideDrawer})
    }
    sideDrawerToggleHandler=()=>{
        this.setState(prevState=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }
    render(){
        return(
            <Aux>
            <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
        {this.props.children}
        </main>
        </Aux>
        )
    }

}
const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token !==null
    }
}
export default connect(mapStateToProps)(Layout);