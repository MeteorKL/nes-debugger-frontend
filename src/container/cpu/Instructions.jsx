import React from 'react';
import PropTypes from 'prop-types';

import './Instructions.scss';
import ws from '../../utils/ws';

import styled from 'styled-components';
const App = styled.div`
    flex: 1;
    position: relative;
`;
const Table = styled.div`
    overflow: scroll;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
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
const Input = styled.input`
    width: 100%;
    border: 0;
    outline: none;
`;

class component extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            instructions: [{
                address: 'C000',
                hex: '',
                disassembly: '',
                comment: ''
            }],
        };
        this.breakpoints = {};
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
            ws.pub('cpu_info');
        });
        ws.sub('cpu_info', (payload) => {
            ws.pub('cpu_mem', { start: 0 });
            if (payload.registers.PC) {
                if (this.ref) {
                    this.ref.classList.remove('current-pc');
                }
                this.ref = this['refs'][payload.registers.PC];
                if (!this.ref) {
                    console.error(`Unknown PC: ${payload.registers.PC}`);
                    return;
                }
                this.ref.classList.add('current-pc');
            }
            if (this.ref.scrollIntoViewIfNeeded) {
                this.ref.scrollIntoViewIfNeeded();
            } else {
                this.ref.scrollIntoView();
            }
        });
    }

    addBreakpoint(address) {
        this.breakpoints[address] = !this.breakpoints[address];
        ws.sub('breakpoint', (payload) => {
            let ref = this['refs'][payload.address];
            if (payload.enable) {
                ref.classList.add('brackpoint');
            } else {
                ref.classList.remove('brackpoint');
            }
        });
        ws.pub('breakpoint', {
            address: address,
            enable: this.breakpoints[address]
        });
    }

    render() {
        return (
            <App>
                <Table className={this.props.className}>
                    <Row>
                        <Column style={{ maxWidth: '100px' }}>Address</Column>
                        <Column style={{ maxWidth: '100px' }}>HexDump</Column>
                        <Column style={{ maxWidth: '300px' }}>Disassembly</Column>
                        <Column>Comment</Column>
                    </Row>
                    {this.state.instructions.map(instruction =>
                        <Row key={instruction.address} ref={instruction.address} onClick={() => { this.addBreakpoint(instruction.address); }}>
                            <Column style={{ maxWidth: '100px' }}>{instruction.address}</Column>
                            <Column style={{ maxWidth: '100px' }}>{instruction.hex}</Column>
                            <Column style={{ maxWidth: '300px' }}>{instruction.disassembly}</Column>
                            <Column><Input /></Column>
                        </Row>
                    )}
                </Table>
            </App>
        );
    }
}

export default component;