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
    state = {
        running: false,
    }
    componentDidMount() {
        ws.sub('cpu_run', () => {
            this.setState({running : true});
        });
        ws.sub('cpu_pause', () => {
            this.setState({running : false});
        });
    }
    render() {
        return (
            <div>
                <div>
                    <Button title="reset(Ctrl+F2)" onClick={() => ws.pub('reset')}>Reset</Button>
                    <Button title="F7" onClick={() => ws.pub('cpu_step')}>Step</Button>
                    <Button title="F9" onClick={() => ws.pub('cpu_run')} disabled={this.state.running}>Run</Button>
                    <Button title="F12" onClick={() => ws.pub('cpu_pause')} disabled={!this.state.running}>Pause</Button>
                </div>
            </div>
        );
    }
}