import React from 'react';

import ToolBar from './ToolBar';
import NesInfo from './NesInfo';
import RomList from './RomList';

import styled from 'styled-components';
const StyledNesInfo = styled(NesInfo)`
    /* position: absolute;
    left: 0;
    top: 30px;
    right: 0; */
`;
export default class component extends React.Component {

    render() {
        return (
            <div className={this.props.className}>
                <ToolBar />
                <RomList />
                <StyledNesInfo />
            </div>
        );
    }
}