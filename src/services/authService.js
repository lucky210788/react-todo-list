import {Component} from "react";
import axios from './axios-set';

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
                return response;
            }
        }
        catch (e) {
            console.log('Error', e);
        }
    };
}