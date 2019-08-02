import React from 'react';
import PropTypes from 'prop-types';
// import { sprintf } from 'sprintf-js';

import ws from '../../utils/ws';

import styled from 'styled-components';
const Table = styled.div`
    border: 1px solid #DDDDDD;
    flex: 1;
`;
const Row = styled.div`
    display: flex;
    :hover input {
        background-color: #DDDDDD;
    }
    :hover {
        background-color: #DDDDDD;
    }
    :nth-child(1){
        font-weight: bold;
        background-color: #547A82;
        border-bottom: 1px solid #DDDDDD;
        color: white;
        position: sticky;
        top: 0;
    }
`;
const Column = styled.div`
    padding-left: 4px;
    flex: 1;
    border-right: 1px solid #DDDDDD;
`;

class component extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    }

    state = {
        stack: []
    }

    componentDidMount() {
        ws.sub('cpu_info', (payload) => {
            this.setState({ stack: payload.stack });
        });
    }

    render() {
        return (
            <Table className={this.props.className}>
                <Row>
                    <Column>
                        Stack
                    </Column>
                </Row>
                {Object.keys(this.state.stack).map(key =>
                    <Row key={key}>
                        <Column>{key}</Column>
                        <Column>{this.state.stack[key]}</Column>
                    </Row>)}
            </Table>
        );
    }
}

export default component;