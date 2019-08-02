import React from 'react';
import PropTypes from 'prop-types';
// import { sprintf } from 'sprintf-js';

import ws from '../../utils/ws';

import styled from 'styled-components';
const App = styled.div`
    position: relative;
`;
const DragDiv = styled.div`
    height: 1px;
    background-color: black;
    :hover {
        cursor: row-resize;
    }
`;
const Table = styled.div`
    overflow: scroll;
    position: absolute;
    left: 0;
    top: 1px;
    bottom: 0;
    right: 0;
    border: 1px solid #DDDDDD;
    :focus {
        outline: 1px solid #444;
    }
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
    white-space:pre;
    padding-left: 4px;
    flex: 1;
    border-left: 1px solid #DDDDDD;
    :nth-child(1){
        border: none;
    }
`;
const Dialog = styled.div`
    position: fixed;
    left: calc(50% - 100px);
    width: 200px;
    top: calc(50% - 50px);
    height: 30px;
`;
const Input = styled.input`
    height: 100%;
    width: 100%;
    outline: none;
    transition: .25s all;
    border: 1px solid #e2e2e2;
    padding: 5px 10px;
    border-radius: 3px;
    :focus {
        border: 1px solid #A2D4AB;
    }
`;
const Button = styled.button`
    /* width: 22px; */
    /* height: 22px; */
    padding: 0 2px;
    margin-left: 5px;
    outline: none;
    /* background-color: green; */
    /* color: white; */
`;

class component extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    }

    state = {
        dialog: false,
        height: 100,
        memory: [],
        start: 0,
        enable: true,
    }

    componentDidMount() {
        ws.sub('cpu_instructions', () => {
            this.setState({ enable: true });
        });
        ws.sub('cpu_mem', (payload) => {
            this.setState({ memory: payload.memory, start: payload.start });
        });
    }

    componentDidUpdate() {
        if (this.state.dialog) {
            this.input.focus();
        }
    }

    onDragStart(e) {
        this.dargStart = e.clientY;
        // console.log('start', e.clientY);
    }

    onDragEnd(e) {
        this.dargEnd = e.clientY;
        this.setState({ height: this.state.height + this.dargStart - this.dargEnd });
        // console.log('end', e.clientY);
    }

    enter(e) {
        if (e.keyCode === 13) {
            ws.pub('cpu_mem', { start: parseInt(this.memoryStart) });
            this.setState({ dialog: false });
        }
    }

    render() {
        return (
            <App className={this.props.className} style={{ height: this.state.height + 'px' }}>
                <Dialog hidden={!this.state.dialog}>
                    <Input ref={r => this.input = r} onChange={e => this.memoryStart = e.target.value} onKeyUp={e => this.enter(e)}></Input>
                </Dialog>
                <DragDiv draggable={true} onDragStart={(e) => this.onDragStart(e)} onDragEnd={(e) => this.onDragEnd(e)}></DragDiv>
                <Table>
                    <Row>
                        <Column>
                            Memory
                            <Button disabled={!this.state.enable} onClick={() => this.setState({ dialog: !this.state.dialog })}>Goto</Button>
                        </Column>
                    </Row>
                    {this.state.memory.map((line) =>
                        <Row key={line.start}>
                            <Column style={{ maxWidth: '8em' }}>{line.start}</Column>
                            <Column style={{ minWidth: '29em' }}>{line.hex}</Column>
                            <Column><code>{line.chars}</code></Column>
                        </Row>
                    )}
                </Table>
            </App>
        );
    }
}

export default component;