import React from 'react';

import ToolBar from './ToolBar';
import NesInfo from './NesInfo';

export default class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            romlist: []
        };
    }

    render() {
        return (
            <div>
                <ToolBar />
                <NesInfo />
            </div>
        );
    }
}