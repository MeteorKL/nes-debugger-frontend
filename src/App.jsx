import React from 'react';
// import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import './App.scss';
// import cpu from './container/cpu/cpu';
// import ppu from './container/ppu/ppu';
// import apu from './container/apu';
// import mem from './container/mem';
// import joystick from './container/joystick';
// import store from './utils/store.js';

// import Common from './container/common/common';

export default class component extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount() {
        let ws = new WebSocket('localhost:5000');
        ws.onopen = (event) => {
            console.log(event);
        };
        ws.onerror = (event) => {
            console.log(event);
        };
        ws.onmessage = (event) => {
            console.log(event);
        };
        ws.onclose = (event) => {
            console.log(event);
        };
    }
    render() {
        return (
            <div>
                {/* <Provider store={store}> */}
                <HashRouter>
                    <div className="App">
                        {/* <Common /> */}
                        <div className="Page">
                            {/* <Route exact path="/" component={cpu} />
                                <Route path="/cpu" component={cpu} />
                                <Route path="/ppu" component={ppu} />
                                <Route path="/apu" component={apu} />
                                <Route path="/mem" component={mem} />
                                <Route path="/joystick" component={joystick} /> */}
                        </div>
                    </div>
                </HashRouter>
                {/* </Provider> */}
            </div>
        );
    }
}
