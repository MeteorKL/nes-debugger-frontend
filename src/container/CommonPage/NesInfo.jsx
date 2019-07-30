import React from 'react';
import PropTypes from 'prop-types';

import ws from '../../utils/ws';

import styled from 'styled-components';
const Table = styled.div`
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
`;
const Row = styled.div`
    display: flex;
    :hover input {
        background-color: #ddd;
    }
    :hover {
        background-color: #ddd;
    }
    :nth-child(1){
        background-color: #4CAF50;
        color: white;
        position: sticky;
        top: 0;
    }
`;
const Column = styled.div`
    padding-left: 4px;
    flex: 1;
    border-right: 1px solid #ddd;
`;

class component extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    }

    state = {
        // nesinfo: {
        //     mapper: "",
        //     mirror: "",
        //     "CHR ROM": "",
        //     "PRG ROM": ""
        // },
    }
    componentDidMount() {
        ws.sub('nesinfo', (payload) => {
            let nesinfo = payload.nesinfo;
            let chrRomKey = nesinfo.isChrRam ? 'CHR RAM' : 'CHR ROM';
            this.setState({
                nesinfo: {
                    mapper: nesinfo.mapper,
                    mirror: nesinfo.mirror,
                    [chrRomKey]: `${nesinfo.chrRom * 8}K (=${nesinfo.chrRom}*8K)`,
                    'PRG ROM': `${nesinfo.chrRom * 16}K (=${nesinfo.chrRom}*16K)`
                },
            });
            ws.pub('cpu_instructions');
        });
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.state.nesinfo ?
                    <Table>
                        <Row>
                            <Column>iNes File Information</Column>
                        </Row>
                        {Object.keys(this.state.nesinfo).map(key =>
                            <Row key={key}>
                                <Column style={{maxWidth: '80px'}}>{key}</Column>
                                <Column>{this.state.nesinfo[key]}</Column>
                            </Row>)}
                    </Table>
                    : <div></div>}
            </div>
        );
    }
}

export default component;