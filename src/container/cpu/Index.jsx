import React from 'react';

import Buttons from './Buttons';
import Instructions from './Instructions';
import Vectors from './Vectors';
import Registers from './Registers';
import Stack from './Stack';
import Memory from './Memory';
import ToolBar from './ToolBar';

import styled from 'styled-components';
const App = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    /* position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0; */
`;
const TopDiv = styled.div`
    width: 100%;
    /* position: absolute;
    left: 0;
    top: 0;
    height: 24px;
    right: 0;
    padding: 1px 0; */
`;
const BodyDiv = styled.div`
    flex: 1;
    display: flex;
    width: 100%;
    /* position: absolute;
    left: 0;
    top: 24px;
    bottom: 24px;
    right: 0;
    padding: 1px 0; */
`;
const FootDiv = styled.div`
    height: 1.5em;
    display: flex;
    flex-wrap: wrap;
`;
const LeftDiv = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    /* border-right: 1px solid #bbb; */
`;
const RightDiv = styled.div`
    display: flex;
    width: 170px;
    flex-wrap: wrap;
    flex-direction: column;
`;
// const StyledInstructions = styled(Instructions)`
//     position: absolute;
//     left: 0;
//     top: 30px;
//     bottom: 0;
//     right: 170px;
// `;
// const StyledRegisters = styled(Registers)`
//     position: fixed;
//     right: 0;
//     top: 0;
//     width: 168px;
// `;
// const StyledStack = styled(Stack)`
//     position: fixed;
//     right: 0;
//     top: 0;
//     width: 168px;
// `;
export default class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            romlist: []
        };
    }

    render() {
        return (
            <App>
                <TopDiv>
                    <Buttons />
                </TopDiv>
                <BodyDiv>
                    <LeftDiv>
                        <Instructions />
                        <Memory/>
                    </LeftDiv>
                    <RightDiv>
                        <Vectors />
                        <Registers />
                        <Stack />
                    </RightDiv>
                </BodyDiv>
                <FootDiv>
                    <ToolBar />
                </FootDiv>
            </App>
        );
    }
}