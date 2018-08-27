import React, {Component} from 'react';
import ContainerDimensions from 'react-container-dimensions';
import NewDeviceForm from './NewDevice';
import axios from 'axios';

import { Table } from 'antd';

const columns = [{
    title: 'Email',
    dataIndex: 'email',
    width: 300
}, {
    title: 'Phone',
    dataIndex: 'phone',
    width: 200,
}];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

export default class Settings extends Component{
    state = {
        devices: []
    };

    componentDidMount(){
        axios({
            method: 'get',
            url: '/api/admin/devices',
            headers: {'Authorization': "bearer " + localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response.data);
            this.setState({devices: response.data});
        })
        .catch(error => {
            console.log(error);
        });
    }

    render(){

        return (
            <section style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 50, height: 'calc(100% - 50px)'}}>
                
                <div style={{marginRight: 200}}>
                    <NewDeviceForm/>
                </div>
                
                <ContainerDimensions>
                    {({width, height}) => {
                        console.log(`current height: ${Math.floor(height)} | width: ${Math.floor(width)}`);
                        return (
                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={this.state.devices}
                                pagination={{pageSize: 30}}
                                scroll={{y: (Math.floor(height) - 100)}}/>
                        );
                    }}
                </ContainerDimensions>
            </section>
        );
    }
}