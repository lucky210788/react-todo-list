import {Component} from "react";
import axios from './axios-set';

export default class RequestService extends Component {
    async getTasks(token) {
        try {
            let res = await axios.get('api/todolist', {headers: {
                    'x-apikey': token
                }});
            return await  res.data;
        }
        catch (e) {
            console.log('Error', e);
        }
    };

    async postTasks(task, token) {
        try {
            let res = await axios.post('api/todolist', task, {headers: {
                    'x-apikey': token
                }});
            return await  res.data
        }
        catch (e) {
            console.log('Error', e);
        }
    }

    async changeTask(id, data, token) {
        try {
            await axios.put(`api/todolist/${id}`, data, {headers: {
                    'x-apikey': token
                }});
        }
        catch (e) {
            console.log('Error', e);
        }
    }

    deleteTasks(id, token) {
        axios.delete(`api/todolist/${id}`, {headers: {
            'x-apikey': token
        }})
            .catch ((e) => console.log('Error', e))
    }

}