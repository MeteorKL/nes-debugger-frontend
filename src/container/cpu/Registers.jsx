import React from 'react';
import PropTypes from 'prop-types';

import ws from '../../utils/ws';

import styled from 'styled-components';
const Table = styled.div`
    border: 1px solid #ddd;
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
    border-left: 1px solid #ddd;
    :nth-child(1){
        border: none;
    }
`;

class component extends React.Component {
    propTypes = {
        className: PropTypes.string,
    }

    state = {
        registers: {
            PC: 0,
            A: 0,
            X: 0,
            Y: 0,
            SP: 0,
            P: 0,
            N: 0, V: 0, U: 0, B: 0,
            D: 0, I: 0, Z: 0, C: 0,
        }
    }

    componentDidMount() {
        ws.sub('cpu_info', (payload) => {
            payload.registers.C = (payload.registers.P >> 0) & 1;
            payload.registers.Z = (payload.registers.P >> 1) & 1;
            payload.registers.I = (payload.registers.P >> 2) & 1;
            payload.registers.D = (payload.registers.P >> 3) & 1;
            payload.registers.B = (payload.registers.P >> 4) & 1;
            payload.registers.U = (payload.registers.P >> 5) & 1;
            payload.registers.O = (payload.registers.P >> 6) & 1;
            payload.registers.N = (payload.registers.P >> 7) & 1;
            this.setState({ registers: payload.registers });
        });
    }

    render() {
        return (
            <Table className={this.props.className}>
                <Row>
                    <Column>
                        Registers
                    </Column>
                </Row>
                {Object.keys(this.state.registers).map(key =>
                    <Row key={key}>
                        <Column>{key}</Column>
                        <Column>{this.state.registers[key]}</Column>
                    </Row>)}
            </Table>
        );
    }
}

export default component;