import React from 'react';

import Registers from './Registers';
import Instructions from './Instructions';

import styled from 'styled-components';
const StyledRegisters = styled(Registers)`
    position: fixed;
    right: 0;
    top: 0;
    width: 168px;
`;
const StyledInstructions = styled(Instructions)`
    position: absolute;
    left: 0;
    top: 30px;
    bottom: 0;
    right: 170px;
`;
export default class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            romlist: []
        };
    }

    render() {
        return (
            <div>
                cpu
                <StyledInstructions/>
                <StyledRegisters/>
            </div>
        );
    }
}