import React from 'react'
import './buton.css'

const Button = props => {
    return (
        <button
            type="button"
            className={props.className}
            onClick={props.onClick}
            disabled={props.disabled}
        >{props.children}</button>
    )
};

export default Button