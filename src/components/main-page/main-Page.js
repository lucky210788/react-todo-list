import React, {Component} from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form/item-add-form';
import RequestService from '../../services/requestService';
import Loader from '../UI/loader/Loader';

import './main-Page.css'

export default class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            todoData: [],
            term: '',
            filter: 'All',
            loading: true,
            _id:''
        }
    }

    requestService = new RequestService();

    deleteItem = (id) => {
        this.requestService.deleteTasks(id);
        let newData = this.state.todoData;
        newData = newData.filter((todo) => (todo._id !== id));
        this.setState({todoData: newData});
    };

    addItem = (title, description) => {
        const newItem = {
            title: title,
            description: description,
            selected: false
        };

        this.requestService.postTasks(newItem)
            .then(res => {
                this.setState({
                    todoData: res
                })
            });
    };

    toggleProperty = (id, propName) => {
        const todoData = this.state.todoData;
        let propVal =null;

        for (let i = 0; i < todoData.length; i++) {
            if (todoData[i]._id === id) {
                propVal = !todoData[i][propName];
                todoData[i][propName] = propVal;
            }
        }

        this.requestService.changeTask(id, {propName: propName, status: propVal}).catch(error => console.error('Error', error));
        propVal =null;
        this.setState(({todoData}) => {
            return {
                todoData
            }
        });

    };

    onToggleImportant = (id) => {
        this.toggleProperty(id, 'selected');
    };

    onToggleDone = (id) => {
        this.toggleProperty(id, 'status');
    };

    onHandleSearch = (term) => {
        this.setState({term});
    };

    search = (items, term) => {
        if (term.length === 0) {
            return items
        }
        return items.filter((item) => (item.title.toLowerCase().indexOf(term.toLowerCase()) !== -1));
    };

    filter = (filter) => {
        const items = this.state.todoData;
        switch (filter) {
            case 'All':
                return items;
            case 'Active':
                return items.filter((item) => (item.status === false));
            case 'Done':
                return items.filter((item) => (item.status === true));
            default:
                return items;
        }
    };

    onHandleFilter = (filter) => {
        this.setState({filter});
    };

    componentDidMount() {
        this.requestService.getTasks()
            .then(res => {
                this.setState({
                    todoData: res,
                    loading: false
                })
            })
            .catch(error => console.error('Error', error));
    };

    render() {
        const {todoData, term, loading} = this.state;
        const doneCount = todoData.filter((todo) => (todo.status)).length;
        const todoCount = todoData.length - doneCount;

        const filter = this.filter(this.state.filter);
        const visibleItems = this.search(filter, term);

        if (loading) {
            return <Loader/>
        }

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onHandleSearch={this.onHandleSearch}/>
                    <ItemStatusFilter onHandleFilter={this.onHandleFilter} activeFiter={this.state.filter}/>
                </div>
                <ItemAddForm
                    onItemAdded={this.addItem}/>
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>
            </div>
        );
    }
};