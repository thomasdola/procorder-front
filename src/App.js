import React, {Component} from 'react';
import Header from './components/header';
import Content from './components/content';
import Login from './components/login';
import './App.css';
import {Layout} from 'antd';

class App extends Component {
  render() {
    return <Layout style={{height: '100%'}}>

      {window.isLogin ? [
        <Header key="header"/>, <Content key="content" />
      ] : (<Login/>)}

    </Layout>
  }
}

export default App;
