import React from 'react';

import ws from '../../utils/ws';

import styled from 'styled-components';
const Table = styled.div`
`;
const Row = styled.div`
    display: flex;
`;
const Column = styled.div`
    flex: 1;
    border-left: 1px solid #ddd;
    :nth-child(1){
        border: none;
    }
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