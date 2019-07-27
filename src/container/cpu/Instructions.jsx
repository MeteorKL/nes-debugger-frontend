import React from 'react';

import ws from '../../utils/ws';

import styled from 'styled-components';
const Table = styled.div`
    overflow: scroll;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
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
const Input = styled.input`
    width: 100%;
    border: 0;
    outline: none;
`;

class component extends React.Component {
    constructor(props) {
        super(props);
        let instructions = [];
        // for (let i = 1; i < 1000; i++) {
        //     instructions.push({
        //         address: i,
        //         hex: "DBF5",
        //         disassembly: "mov $F5",
        //         comment: 'Hello'
        //     });
        // };
        this.state = {
            instructions: instructions
        };
    }

    componentDidMount() {
        ws.sub('cpu_instructions', (payload) => {
            this.setState({
                instructions: payload.instructions.map(instruction => {
                    return {
                        address: instruction.address,
                        hex: instruction.hex,
                        disassembly: instruction.opcode + ' ' + instruction.opdata,
                        comment: ''
                    };
                })
            });
            ws.pub('cpu_registers');
        });
    }

    render() {
        return (
            <div className={this.props.className}>
                <Table>
                    <Row>
                        <Column style={{ maxWidth: '100px' }}>Address</Column>
                        <Column style={{ maxWidth: '100px' }}>HexDump</Column>
                        <Column style={{ maxWidth: '300px' }}>Disassembly</Column>
                        <Column>Comment</Column>
                    </Row>
                    {this.state.instructions.map(instruction =>
                        <Row key={instruction.address} onClick={() => { }}>
                            <Column style={{ maxWidth: '100px' }}>{instruction.address}</Column>
                            <Column style={{ maxWidth: '100px' }}>{instruction.hex}</Column>
                            <Column style={{ maxWidth: '300px' }}>{instruction.disassembly}</Column>
                            <Column><Input /></Column>
                        </Row>
                    )}
                </Table>
            </div >
        );
    }
}

export default component;