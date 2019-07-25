import React from 'react';

import ws from '../utils/ws';

import styled from 'styled-components';
const Table = styled.table`
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #4CAF50;
        color: white;
    }
    tr:nth-child(even){
        background-color: #f2f2f2;
    }
    tr:hover {
        background-color: #ddd;
    }
    td, th {
        border: 1px solid #ddd;
        padding: 8px;
    }
`;

class component extends React.Component {
    state = {

    }
    componentDidMount() {
        ws.sub('nesinfo', (payload) => {
            this.setState({ nesinfo: payload.nesinfo });
        });
    }

    render() {
        let chrRom = this.state.nesinfo ? this.state.nesinfo.chrRom : 0;
        let prgRom = this.state.nesinfo ? this.state.nesinfo.prgRom : 0;
        return (
            <div>
                {this.state.nesinfo ?
                    <Table>
                        <thead>
                            <tr>
                                <th colSpan="2">iNes File Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>mapper</td>
                                <td>{this.state.nesinfo.mapper}</td>
                            </tr>
                            <tr>
                                <td>mirror</td>
                                <td>{this.state.nesinfo.mirror}</td>
                            </tr>
                            {this.state.isChrRam ?
                                <tr>
                                    <td>CHR RAM</td>
                                    <td>{chrRom * 8}K (={chrRom}*8K={chrRom}*0x2000)</td>
                                </tr>
                                :
                                <tr>
                                    <td>CHR ROM</td>
                                    <td>{chrRom * 8}K (={chrRom}*8K={chrRom}*0x2000)</td>
                                </tr>
                            }
                            <tr>
                                <td>PRG ROM</td>
                                <td>{prgRom * 16}K (={prgRom}*8K={prgRom}*0x2000)</td>
                            </tr>
                        </tbody>
                    </Table>
                    : <div></div>}
            </div>
        );
    }
}

export default component;