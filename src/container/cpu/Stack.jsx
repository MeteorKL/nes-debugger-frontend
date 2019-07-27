import React from 'react';

import ws from '../../utils/ws';

import styled from 'styled-components';
const Table = styled.div`
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
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
        ws.sub('cpu_registers', (payload) => {
            this.setState({ registers: payload.registers });
        });
    }

    render() {
        return (
            <div className={this.props.className}>
                <Table>
                    <Row>
                        Registers
                    </Row>
                        {Object.keys(this.state.registers).map(key =>
                            <Row key={key}>
                            <Column>{key}</Column>
                            <Column>{this.state.registers[key]}</Column>
                            </Row>)}
                </Table>
            </div>
        );
    }
}

export default component;