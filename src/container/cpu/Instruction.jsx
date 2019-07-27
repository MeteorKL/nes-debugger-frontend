import React from 'react';

import ws from '../../utils/ws';

import styled from 'styled-components';
const Table = styled.div`
`;
const Row = styled.div`
    border-left: 1px solid #ddd;
    display: flex;
`;
const Column = styled.div`
    flex: 1;
    border-right: 1px solid #ddd;
`;
const HeaderColumn = styled(Column)`
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
`;
const Input = styled.input`
    width: 100%;
    border: 0;
    outline: none;
`;

class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosen: false
        }
    }
    state = {
        instructions: [
            {
                address: "0000",
                hexDump: "DBF5",
                disassembly: "mov $F5",
                comment: 'Hello'
            }
        ]
    }

    componentDidMount() {
        ws.sub('cpu_instructions', (payload) => {
            this.setState({ instructions: payload.instructions });
        });
    }

    render() {
        return (
            <Row onClick={() => { }}>
                <Column style={{ maxWidth: "100px" }}>{instruction.address}</Column>
                <Column>{instruction.hexDump}</Column>
                <Column>{instruction.disassembly}</Column>
                <Column><Input /></Column>
            </Row>
        );
    }
}

export default component;