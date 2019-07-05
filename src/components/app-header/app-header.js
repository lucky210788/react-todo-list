import React from 'react';

import './app-header.css';

const AppHeader = ({toDo, done, onLogOut}) => {
    return (
        <div className="app-header d-flex">
            <h1>Todo List</h1>
            <h2>{toDo} more to do, {done} done</h2>
            <button
                className='btn-logout'
                onClick={onLogOut}
            >
                {/*<img src='./img/logout.svg' alt='logout'/>*/}
            </button>
        </div>
    );
};

export default AppHeader;