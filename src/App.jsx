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
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
`;
const StyledCommonPage = styled(CommonPage)`
    display: flex;
    flex-direction: column;
    /* position: absolute;
    top: 0;
    bottom: 0;
    left: 0; */
    width: 258px;
`;
const DebugPage = styled.div`
    display: flex;
    /* position: absolute;
    top: 0;
    bottom: 0;
    left: 260px;
    right: 0; */
    border-left: 1px solid #2A363B;
    flex: 1;
`;

export default class component extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <StyledCommonPage>

                    </StyledCommonPage>
                    <DebugPage>
                        <Route exact path="/" component={Index} />
                        <Route path="/cpu" component={cpu} />
                        {/* <Route path="/ppu" component={ppu} />
                                <Route path="/apu" component={apu} />
                                <Route path="/mem" component={mem} />
                                <Route path="/joystick" component={joystick} /> */}
                    </DebugPage>
                </App>
            </HashRouter>
        );
    }
}
