import React from 'react';
import PropTypes from 'prop-types';

import ws from '../../utils/ws';

import styled from 'styled-components';
const Table = styled.div`
    border: 1px solid #DDDDDD;
`;
const Row = styled.div`
    display: flex;
    :hover input {
        background-color: #DDDDDD;
    }
    :hover {
        background-color: #DDDDDD;
    }
    :nth-child(1){
        font-weight: bold;
        background-color: #547A82;
        border-bottom: 1px solid #DDDDDD;
        color: white;
        position: sticky;
        top: 0;
    }
`;
const Column = styled.div`
    padding-left: 4px;
    flex: 1;
    border-left: 1px solid #DDDDDD;
    :nth-child(1){
        border: none;
    }
`;

class component extends React.Component {
    static propTypes = {
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
        },
        flags: [
            0, 0, 0, 0, 0, 0, 0, 0
        ]
    }

    componentDidMount() {
        ws.sub('cpu_info', (payload) => {

            this.setState({
                registers: payload.registers,
                flags: Array.apply(null, { length: 8 }).map((_, i) => (payload.registers.P >> i) & 1)
            });
        });
    }

    render() {
        return (
            <div className={this.props.className}>

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
                <Table className={this.props.className}>
                    <Row>
                        <Column>
                            Flags
                        </Column>
                    </Row>
                    <Row>
                        <Column>C</Column>
                        <Column>Z</Column>
                        <Column>I</Column>
                        <Column>D</Column>
                        <Column>B</Column>
                        <Column>U</Column>
                        <Column>O</Column>
                        <Column>N</Column>
                    </Row>
                    <Row>
                        {Object.keys(this.state.flags).map((key, i) =>
                            <Column key={i}>{this.state.flags[key]} </Column>
                        )}
                    </Row>
                </Table>
            </div>
        );
    }
}

export default component;