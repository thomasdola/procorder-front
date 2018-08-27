import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';

export default class Process extends Component{

    render(){
        const {timestamp, duration, waiting, center, device} = this.props;
        return(
            <Card style={{ width: 250, marginLeft: 5 }}>
                <p>Date: {timestamp}</p>
                <p>Duration: {duration}</p>
                <p>Waiting Time: {waiting}</p>
                <p>Center: {center}</p>
                <p>Device: {device}</p>
            </Card>
        );
    }

    static propTypes = {
        // onClick: PropTypes.func.isRequired,
        id: PropTypes.number.isRequired,
        timestamp: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
        waiting: PropTypes.number.isRequired,
        center: PropTypes.string.isRequired,
        device: PropTypes.string.isRequired,
    };
}