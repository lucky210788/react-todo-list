import {Component} from "react";
import axios from './axios-set';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class AuthService extends Component {

    async registration(newUser) {
        try {
            await axios.post('api/registration', newUser);
        }
        catch (e) {
            console.log('Error', e);
        }
    };

    async login(user) {
        try {
            const response = await axios.post('api/login', user);
            if (response) {
                cookies.set('token', response.data, {path: '/'});
            }
        }
        catch (e) {
            console.log('Error', e);
        }
    };
}