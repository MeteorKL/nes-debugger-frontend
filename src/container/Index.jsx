import React from 'react';
import ws from '../utils/ws';

export default class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: 'Index'
        };
    }

    componentDidMount() {
        ws.sub('test', (payload) => {
            this.setState({msg: JSON.stringify(payload)});
        });
    }

    render() {
        return (
            <button onClick={()=>ws.pub('xx', 'xx')}>
                {this.state.msg}
            </button>
        );
    }
}