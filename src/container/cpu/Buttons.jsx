import React from 'react';

import ws from '../../utils/ws';

import styled from 'styled-components';
const Input = styled.input`
    /* width: 22px; */
    height: 22px;
    padding: 0 2px;
    margin-left: 5px;
    outline: none;
`;
const Button = styled.button`
    /* width: 22px; */
    height: 22px;
    padding: 0 2px;
    margin-left: 5px;
    outline: none;
`;

export default class component extends React.Component {
    state = {
        disable: true,
        running: false,
        runInterval: 500,
    }
    componentDidMount() {
        ws.sub('cpu_instructions', () => {
            this.setState({ disable: false });
        });
        ws.sub('cpu_run', () => {
            this.setState({ running: true });
        });
        ws.sub('cpu_pause', () => {
            this.setState({ running: false });
        });
    }
    render() {
        return (
            <div>
                <div>
                    <Button title="reset(Ctrl+F2)" onClick={() => ws.pub('reset')}
                        disabled={this.state.disable}>Reset</Button>
                    <Button title="F7" onClick={() => ws.pub('cpu_step')}
                        disabled={this.state.disable}>Step</Button>
                    <Input defaultValue={this.state.runInterval} onChange={e => this.setState({ runInterval: parseInt(e.target.value) })}
                        disabled={this.state.disable} />
                    <Button title="F9" onClick={() => ws.pub('cpu_run', { runInterval: this.state.runInterval })}
                        disabled={this.state.disable || this.state.running}>Run</Button>
                    <Button title="F12" onClick={() => ws.pub('cpu_pause')}
                        disabled={this.state.disable || !this.state.running}>Pause</Button>
                </div>
            </div>
        );
    }
}