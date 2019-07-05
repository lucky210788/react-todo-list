import React, {Component} from 'react';

import './search-panel.css'

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    onLabelChange = (e) => {
        let text = e.target.value;
        this.setState({text});
        this.props.onHandleSearch(text);
    };

    render() {

        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   onChange={this.onLabelChange}
                   value={this.state.label}/>
        );
    }
};