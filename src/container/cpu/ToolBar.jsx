import React from 'react';

import ws from '../../utils/ws';

import styled from 'styled-components';
const App = styled.div`
    width: 100%;
`;
const Input = styled.input`
    outline: none;
`;

export default class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'black',
            value: '',
            commands: []
        };
    }

    componentDidMount() {
        ws.onclose(() => this.setState({status: 'black'}));
        ws.onerror(() => this.setState({status: 'red'}));
        ws.onopen(() => this.setState({status: 'green'}));
    }

    render() {
        const Status = styled.div`
        float: right;
            height: 100%;
            width: 24px;
            background-color: ${this.state.status};
            border: 1px solid #ddd;
        `;
        return (
            <App>
                <label>Command:
                    <Input />
                    {/* <select value={this.state.value} onChange={this.handleChange}>
                        {this.state.commands.map(command =>
                            <option key={command} value={command}>{command}</option>)
                        }
                    </select> */}
                </label>
                <Status />
            </App>
        );
    }
}