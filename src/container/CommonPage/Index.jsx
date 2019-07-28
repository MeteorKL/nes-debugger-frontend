import React from 'react';

import ToolBar from './ToolBar';
import NesInfo from './NesInfo';
import RomList from './RomList';

import styled from 'styled-components';
const App = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    /* position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0; */
`;
const StyledNesInfo = styled(NesInfo)`
    /* position: absolute;
    left: 0;
    top: 30px;
    right: 0; */
`;
export default class component extends React.Component {

    render() {
        return (
            <App className={this.props.className}>
                <ToolBar />
                <RomList />
                <StyledNesInfo />
            </App>
        );
    }
}