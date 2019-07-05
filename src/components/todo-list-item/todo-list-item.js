import React, {Component} from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {
    render() {
        const {title, onDeleted, onToggleImportant, onToggleDone, status, selected, description} = this.props;

        let classNames = 'todo-list-item';
        if (status) {
            classNames += ' done';
        }

        if (selected) {
            classNames += ' important';
        }

        return (
            <div className={classNames}>
                <div className="title-description">
                    <p className="todo-list-item-label"
                        onClick={onToggleDone}>
                        {title}
                    </p>
                    <p>{description}</p>
                </div>
                <div className="buttons-block">
                    <button type="button"
                            className="btn btn-outline-success btn-sm float-right"
                            onClick={onToggleImportant}>
                        <i className="fa fa-exclamation"/>
                    </button>
                    <button type="button"
                            className="btn btn-outline-danger btn-sm float-right"
                            onClick={onDeleted}>
                        <i className="fa fa-trash-o"/>
                    </button>
                </div>
            </div>
        );
    }
};