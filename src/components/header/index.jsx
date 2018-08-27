import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import _isEqual from 'lodash/isEqual';
import { Layout, Menu, Icon } from 'antd';
const { Header } = Layout;

class MainHeader extends Component{
    state = {
        selectedMenuKey: "1"
    };

    static getDerivedStateFromProps(nextProps, prevState){
        const {location: {pathname}} = nextProps;
        const menuKey = MainHeader.getMenuKeyFromPathname(pathname);

        if(_isEqual(menuKey, prevState.selectedMenuKey))
            return null;

        return {
            selectedMenuKey: `${menuKey}`
        };
    }

    static getMenuKeyFromPathname(pathname){
        switch(pathname){
            case "/processes/list":
                return 1;
            case "/users":
                return 2;
            case "/settings":
                return 3;
            default:
                return 1;
        }
    }

    render(){
        const {history: {push}} = this.props;
        return (
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="App-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[this.state.selectedMenuKey]}
                    style={{ lineHeight: '64px', fontSize: "1.3em" }}
                >
                    <Menu.Item key="1" onClick={() => push('/processes/list')}>
                        <Icon type="dashboard" />Processes
                    </Menu.Item>
                    {/* <Menu.Item key="2" onClick={() => push('/users')}>
                        <Icon type="contacts" /> Users
                    </Menu.Item> */}
                    <Menu.Item key="3" onClick={() => push('/settings')}>
                        <Icon type="setting" />Settings
                    </Menu.Item>
                </Menu>
            </Header>
        )
    }

    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired
    };
}

export default withRouter(MainHeader);