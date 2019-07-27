import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Index from './container/Index';
import cpu from './container/cpu/Index';
// import ppu from './container/ppu/ppu';
// import apu from './container/apu';
// import mem from './container/mem';
// import joystick from './container/joystick';
// import store from './utils/store.js';

import CommonPage from './container/CommonPage/Index';

import styled from 'styled-components';
const App = styled.div`
    .CommonPage {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 258px;
        /* border-right: 2px solid darkgrey; */
    }
    .DebugPage {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 260px;
        right: 0;
    }
`;

export default class component extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <CommonPage className="CommonPage">

                    </CommonPage>
                    <div className="DebugPage">
                        <Route exact path="/" component={Index} />
                        <Route path="/cpu" component={cpu} />
                        {/* <Route path="/ppu" component={ppu} />
                                <Route path="/apu" component={apu} />
                                <Route path="/mem" component={mem} />
                                <Route path="/joystick" component={joystick} /> */}
                    </div>
                </App>
            </HashRouter>
        );
    }
}
