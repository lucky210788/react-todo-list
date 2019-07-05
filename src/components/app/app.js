import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import SingUp from '../singUp-page/singUp';
import Login from '../login-page/login';
import MainPage from '../main-page/main-Page';
import Cookies from 'universal-cookie';
import PrivateRoute from '../privateRoute/privateRoute'
import LoginRoute from '../loginRoute/loginRoute'

import './app.css'

const cookies = new Cookies();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogIn: false
        };
    }

    onLogIn = () => {
        this.setState({
            isLogIn: true
        })
    };

    onLogOut = () => {
        cookies.remove('token');
        this.setState({
            isLogIn: false
        })
    };

    componentDidMount() {
        const token = cookies.get('token');
        if(token){
            this.onLogIn();
        }
    }

    render() {
        return (
            <div>
        <Switch>
            <LoginRoute
                path="/login"
                component={Login}
                isLogIn={this.state.isLogIn}
                onLogIn={this.onLogIn}/>
            <Route path="/singup" component={SingUp}/>
            <PrivateRoute
                path="/"
                component={MainPage}
                isLogIn={this.state.isLogIn}
                onLogOut={this.onLogOut}/>
            {/*<Route component={NotFound}/>*/}
        </Switch>
            </div>
        );
    }
};