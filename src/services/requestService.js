import {Component} from "react";
import axios from './axios-set';

export default class RequestService extends Component {
    async getTasks() {
        try {
            let res = await axios.get('api/todolist');
            return await  res.data;
        }
        catch (e) {
            console.log('Error', e);
        }
    };

    async postTasks(task) {
        try {
            let res = await axios.post('api/todolist', task);
            return await  res.data
        }
        catch (e) {
            console.log('Error', e);
        }
    }

    async changeTask(id, propName, status) {
        try {
            await axios.put(`api/todolist/${id}`, propName, status);
        }
        catch (e) {
            console.log('Error', e);
        }
    }

    deleteTasks(id) {
        axios.delete(`api/todolist/${id}`)
            .catch ((e) => console.log('Error', e))
    }

}