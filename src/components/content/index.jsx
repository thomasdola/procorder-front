import React, { Component } from 'react';

import {Route} from 'react-router-dom';

import Breadcrumb from './breadcrumb';
import Home from './home';
import Users from './users';
import Settings from './settings';

// import './index.css';
import { Layout } from 'antd';
const { Content } = Layout;

export default class MainContent extends Component {
    render() {
        return (
            <Content style={{ padding: '0 50px', marginTop: 64 }}>

                <Breadcrumb />

                <div className="App-content" style={{ background: '#fff', padding: 24 }}>

                    <Route path="/processes" component={Home}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/settings" component={Settings}/>

                </div>
            </Content>
        );
    }
}
