import React from 'react';
import PropTypes from 'prop-types';

import ws from '../../utils/ws';

import styled from 'styled-components';
const Table = styled.div`
    border: 1px solid #DDDDDD;
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
    border-left: 1px solid #DDDDDD;
    :nth-child(1){
        border: none;
    }
`;

class component extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    }

    state = {
        vectors: {
            nmi: 0,
            rst: 0,
            irq: 0
        }
    }

    componentDidMount() {
        ws.sub('cpu_instructions', (payload) => {
            this.setState({ vectors: payload.vectors });
        });
    }

    render() {
        return (
            <Table className={this.props.className}>
                <Row>
                    <Column>
                        Vectors
                    </Column>
                </Row>
                {Object.keys(this.state.vectors).map(key =>
                    <Row key={key}>
                        <Column>{key}</Column>
                        <Column>{this.state.vectors[key]}</Column>
                    </Row>)}
            </Table>
        );
    }
}

export default component;