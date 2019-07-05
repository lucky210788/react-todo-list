import React, {Component} from 'react';

import './item-add-form.css'

export default class ItemAddForm extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: ''
        }
    }

    onTitleChange = (e) => {
        this.setState({
            title: e.target.value
        });
    };

    onTitleDescription = (e) => {
        this.setState({
            description: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.title, this.state.description);
        this.setState({
            title: '',
            description: ''
        });
    };

    render() {
        return (
            <form className="item-add-form"
                  onSubmit={this.onSubmit}>
                <div className="form-row mb-1">
                    <input type="text"
                           className="form-control"
                           onChange={this.onTitleChange}
                           placeholder="Task title"
                           value={this.state.title}/>
                    <button className="btn btn-outline-secondary">
                        Add Item
                    </button>
                </div>
                <div className="form-row">
                <textarea type="text"
                          className="form-control "
                          onChange={this.onTitleDescription}
                          placeholder="What needs to be done"
                          value={this.state.description}>
                </textarea>
                </div>

            </form>
        )
    }
}