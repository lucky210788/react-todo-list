import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import SingUp from '../singUp-page/singUp';
import Login from '../login-page/login';
import MainPage from '../main-page/main-Page';


import './app.css'

export default class App extends Component {
    render() {
        return (
            <div>
        <Switch>
            {/*<LoginRoute*/}
                {/*path="/login"*/}
                {/*component={Login}*/}
                {/*isLogIn={this.state.isLogIn}*/}
                {/*onLogIn={this.onLogIn}/>*/}
            <Route path="/singup" component={SingUp}/>
            <Route path="/login" component={Login}/>
            <Route path="/" component={MainPage}/>
            {/*<PrivateRoute*/}
                {/*path="/"*/}
                {/*component={MainPage}*/}
                {/*isLogIn={this.state.isLogIn}*/}
                {/*onLogOut={this.onLogOut}/>*/}
            {/*<Route component={NotFound}/>*/}
        </Switch>
            </div>
        );
    }
};