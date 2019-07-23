import React from 'react';
// import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import './App.scss';
// import WebSockets from './components/WebSockets';
// import {WebSocketContext} from './context/ws';
import Index from './container/Index';
// import cpu from './container/cpu/cpu';
// import ppu from './container/ppu/ppu';
// import apu from './container/apu';
// import mem from './container/mem';
// import joystick from './container/joystick';
// import store from './utils/store.js';

// import Common from './container/common/common';

export default class component extends React.Component {
    render() {
        return (
            <HashRouter>
                <div className="App">
                    {/* <Common /> */}
                    <div className="Page">
                        <Route exact path="/" component={Index} />
                        {/* <Route path="/cpu" component={cpu} />
                                <Route path="/ppu" component={ppu} />
                                <Route path="/apu" component={apu} />
                                <Route path="/mem" component={mem} />
                                <Route path="/joystick" component={joystick} /> */}
                    </div>
                </div>
            </HashRouter>
        );
    }
}
