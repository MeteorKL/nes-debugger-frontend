import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

export default class component extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        hidden: PropTypes.bool
    }

    render() {
        return (
            <Div hidden={this.props.hidden}>
                {this.props.children}
            </Div>
        );
    }
}