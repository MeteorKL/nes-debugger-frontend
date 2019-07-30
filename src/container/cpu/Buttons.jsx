import React from 'react';

import ws from '../../utils/ws';

import styled from 'styled-components';
const Button = styled.button`
    /* width: 22px; */
    height: 22px;
    padding: 0 2px;
    margin-left: 5px;
    outline: none;
`;

export default class component extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <Button title="F7" onClick={() => ws.pub('cpu_step')}>Step</Button>
                    {/* <Button title="F9" onClick={() => ws.pub('cpu_run')}>Run</Button> */}
                    {/* <Button title="F12" onClick={() => ws.pub('stop')}>Pause</Button> */}
                </div>
            </div>
        );
    }
}