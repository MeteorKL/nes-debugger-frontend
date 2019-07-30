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
        font-weight: bold;
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
    static propTypes = {
        className: PropTypes.string,
    }

    state = {
        height: 100,
        memories: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }

    componentDidMount() {
        ws.sub('cpu_memory', (payload) => {
            this.setState({ memories: payload.memories });
        });
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

    render() {
        return (
            <App className={this.props.className} style={{ height: this.state.height+'px' }}>
                <DragDiv draggable={true} onDragStart={(e) => this.onDragStart(e)} onDragEnd={(e) => this.onDragEnd(e)}></DragDiv>
                <Table>
                    <Row>
                        <Column>
                            Memory
                        </Column>
                    </Row>
                    {this.state.memories.map((memory, i) =>
                        <Row key={i}>
                            <Column style={{ maxWidth: '8em' }}>FFFF</Column>
                            <Column style={{ minWidth: '29em' }}>00 01 34 1F 00 01 34 1F 00 01 34 1F 00 01 34 1F</Column>
                            <Column>AVSDGREV395ggd2g</Column>
                        </Row>)}
                </Table>
            </App>
        );
    }
}

export default component;