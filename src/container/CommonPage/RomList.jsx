import React from 'react';

import ws from '../../utils/ws';

import styled from 'styled-components';
const List = styled.ul`
    margin: 0;
    padding: 0;
`;
const Item = styled.li`
    margin: 10px 0;
    list-style: none;
    font-weight: bold;
`;
const Button = styled.button`
    padding: 5px;
`;
export default class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            romlist: []
        };
    }

    componentDidMount() {
        ws.sub('romlist', (payload) => {
            this.setState({ romlist: payload.romlist });
        });
    }

    render() {
        return (
            <div className={this.props.className}>
                <List>{this.state.romlist.map(rom =>
                    <Item key={rom}>
                        <Button onClick={() => ws.pub('loadrom', rom)}>{rom}</Button>
                    </Item>
                )}
                </List>
            </div>
        );
    }
}