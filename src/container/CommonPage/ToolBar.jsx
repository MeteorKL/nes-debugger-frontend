import React from 'react';

import ws from '../../utils/ws';

import styled from 'styled-components';
const Button = styled.button`
    width: 22px;
    height: 22px;
    margin-right: 10px;
    outline: none;
`;

export default class component extends React.Component {

    render() {
        return (
            <div>
                <Button title="create" onClick={() => ws.pub('romlist')}>+</Button>
                <Button title="reset(Ctrl+F2)" onClick={() => ws.pub('reset')}>↻</Button>
                <Button title="run" onClick={() => ws.pub('run')}>►</Button>
                <Button title="stop" onClick={() => ws.pub('stop')}>▣</Button>
            </div>
        );
    }
}