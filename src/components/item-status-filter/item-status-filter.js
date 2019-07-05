import React, {Component} from 'react'

import './item-status-filter.css'

export default class ItemStatusFilter extends Component {
    constructor() {
        super();
        this.state = {
            btnNames: ["All", "Active", "Done"]
        }
    }

    render() {
        const {btnNames} = this.state;
        const {activeFiter} = this.props;

        let btn = btnNames.map((btnName) => {
            let clazz;
            if (activeFiter === btnName) {
                clazz = 'btn btn-info';
            } else {
                clazz = 'btn btn-outline-secondary';
            }
            return (
                <button type="button"
                        className={clazz}
                        onClick={() => this.props.onHandleFilter(`${btnName}`)}
                        key={btnName}>
                    {btnName}
                </button>
            )
        });

        return (
            <div className="btn-group">
                {btn}
            </div>
        )
    }
}