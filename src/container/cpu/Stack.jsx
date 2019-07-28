import React from 'react';
// import { sprintf } from 'sprintf-js';

import ws from '../../utils/ws';

import styled from 'styled-components';
const Table = styled.div`
    border: 1px solid #ddd;
    flex: 1;
`;
const Row = styled.div`
    display: flex;
    :hover input {
        background-color: #ddd;
    }
    :hover {
        background-color: #ddd;
    }
    :nth-child(1){
        background-color: #4CAF50;
        border-bottom: 1px solid #ddd;
        color: white;
        position: sticky;
        top: 0;
    }
`;
const Column = styled.div`
    padding-left: 4px;
    flex: 1;
    border-right: 1px solid #ddd;
`;

class component extends React.Component {
    state = {
        stack: []
    }

    componentDidMount() {
        ws.sub('cpu_info', (payload) => {
            this.setState({ stack: payload.stack });
        });
    }

    render() {
        return (
            <Table className={this.props.className}>
                <Row>
                    <Column>
                        Stack
                        </Column>
                </Row>
                {Object.keys(this.state.stack).map(key =>
                    <Row key={key}>
                        <Column>{key}</Column>
                        <Column>{this.state.stack[key]}</Column>
                    </Row>)}
            </Table>
        );
    }
}

export default component;