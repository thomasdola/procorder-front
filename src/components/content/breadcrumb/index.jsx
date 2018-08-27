import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
// import './index.css';

export default class MainBreadcrumb extends Component{
    render(){

        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}
