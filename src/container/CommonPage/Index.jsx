import React from 'react';
import PropTypes from 'prop-types';

import ws from '../../utils/ws';

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
    static propTypes = {
        className: PropTypes.string,
    }
    state = {
        romlist: false
    }

    componentDidMount() {
        ws.sub('romlist', () => {
            this.setState({ romlist: true });
        });
        ws.sub('nesinfo', () => {
            this.setState({ romlist: false });
        });
    }

    render() {
        return (
            <App className={this.props.className}>
                <ToolBar />
                <RomList hidden={!this.state.romlist}/>
                <StyledNesInfo />
            </App>
        );
    }
}