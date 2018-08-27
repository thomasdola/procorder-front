import React, {Component} from 'react';
import ContainerDimensions from 'react-container-dimensions';
import axios from 'axios';
import { Table, Timeline, Tag, Icon, Input, Select, DatePicker, Button } from 'antd';
import {toHHMMSS} from '../../../../index';

import moment from 'moment';

const { RangePicker } = DatePicker;

const dateFormat = "MMM Do YY";

const Search = Input.Search;
const Option = Select.Option;

const columns = [{
    title: 'Date',
    dataIndex: 'date',
    width: 300,
    render: date => {
        const lDate = new Date(date);
        return lDate.toDateString()
    }
}, {
    title: 'Duration',
    dataIndex: 'duration',
    width: 200,
    render: duration => (<Tag>{toHHMMSS(duration)}</Tag>) 
}, {
    title: 'Waiting Time',
    dataIndex: 'waiting',
    width: 200,
    render: duration => (<Tag color="red">{toHHMMSS(duration)}</Tag>) 
}, {
    title: 'Center Code',
    dataIndex: 'center',
    width: 300
}, {
    title: 'Interviewer ID',
    dataIndex: 'interviewer',
    width: 200,
},
{
    title: 'Operator ID',
    dataIndex: 'operator',
    width: 200,
},
{
    title: 'Issuer ID',
    dataIndex: 'issuer',
    width: 200,
},
{
    title: 'Recorded by',
    dataIndex: 'device',
    width: 300,
}];


export default class Processes extends Component{

    state = {
        processes: [],
        filterBy: "center",
        filterQuery: "",
        startDate: moment(),
        endDate: moment()
    };

    componentDidMount(){
        axios({
            method: 'get',
            url: `/api/admin/processes`,
            headers: {'Authorization': "bearer " + localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response.data);
            this.setState({processes: response.data});
        })
        .catch(error => {
            console.log(error);
        });
    }

    disabledDate = current => {
        return current && current > moment().endOf('day');
    }

    onFilter = value => {
        console.log(value);
        const filterQuery = value.trim();
        if(!filterQuery) return;

        this.setState({filterQuery})
        const {filterBy} = this.state;
        axios({
            method: 'get',
            url: `/api/admin/processes?filter=${filterBy}&query=${value.trim()}&start=${moment(this.state.startDate).unix()}&end=${moment(this.state.endDate).unix()}`,
            headers: {'Authorization': "bearer " + localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response.data);
            this.setState({processes: response.data});
        })
        .catch(error => {
            console.log(error);
        });
    }; 

    onDateRangeChange = ([startDate, endDate]) => {
        this.setState({startDate, endDate});
        axios({
            method: 'get',
            url: `/api/admin/processes?start=${moment(startDate).unix()}&end=${moment(endDate).unix()}`,
            headers: {'Authorization': "bearer " + localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response.data);
            this.setState({processes: response.data});
        })
        .catch(error => {
            console.log(error);
        });
    };

    onFilterByChange = value => {
        this.setState({filterBy: value});
        console.log(value);
    }

    onExport = () => {
        console.log("exporting...");
        this.setState({exporting: true})
        const {filterBy, filterQuery, startDate, endDate} = this.state;
        let q = `?export=xlsx&start=${moment(startDate).unix()}&end=${moment(endDate).unix()}`;

        if(filterQuery.trim()){
            q = `${q}&filter=${filterBy}&query=${filterQuery.trim()}`;
        }

        axios({
            method: 'get',
            url: `/api/admin/processes${q}`,
            headers: {'Authorization': "bearer " + localStorage.getItem('token')},
            responseType: 'blob',
        })
        .then(response => {
            console.log("done exporting...");
            this.setState({exporting: false});
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Registrations.xlsx');
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => {
            this.setState({exporting: false});
            console.log(error);
        });
    };

    render(){

        const timeline = steps => {
            return (
                <Timeline mode="alternate">
                    {
                        steps.map(({name, duration, id}) => {
                            return name.startsWith("Waiting") 
                                ? (
                                    <Timeline.Item key={id} color="red">
                                        {name} / <Icon type="clock-circle-o" style={{ fontSize: '16px', margin: '0 10px' }} /> 
                                        <Tag color="red">
                                            {toHHMMSS(duration)}
                                        </Tag>
                                    </Timeline.Item>
                                ) 
                                : (
                                    <Timeline.Item key={id}>
                                        {name} 
                                        <Icon type="clock-circle-o" style={{ fontSize: '16px', margin: '0 10px' }} />
                                        <Tag color="#2db7f5">
                                            {toHHMMSS(duration)}
                                        </Tag>
                                    </Timeline.Item>
                                );
                        })
                    }
                </Timeline>
            );
        };

        const selectBefore = (
            <Select value={this.state.filterBy} style={{ width: 200 }} onChange={this.onFilterByChange}>
              <Option value="center">Center Code</Option>
              <Option value="interviewer">Interviewer ID</Option>
              <Option value="operator">Operator ID</Option>
              <Option value="issuer">Issuer ID</Option>
            </Select>
        );

        return (
            <section style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 50, height: 'calc(100% - 50px)'}}>
                
                <div style={{ width: '70%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
                    <RangePicker
                        allowClear={false}
                        value={[moment(this.state.startDate, dateFormat), moment(this.state.endDate, dateFormat)]}
                        onChange={this.onDateRangeChange}
                        disabledDate={this.disabledDate}
                        format={dateFormat}
                        />

                    <Search
                        style={{ width: '60%' }}
                        addonBefore={selectBefore}
                        placeholder="input search text"
                        onSearch={this.onFilter}
                        enterButton={<Icon type="filter" style={{ fontSize: '16px' }} />}
                        />

                    <Button onClick={this.onExport} type="primary" icon="download">Export</Button>
                </div>

                <ContainerDimensions>
                    {({width, height}) => {
                        console.log(`current height: ${Math.floor(height)} | width: ${Math.floor(width)}`);
                        return (
                            <Table
                                columns={columns}
                                expandedRowRender={record => <div style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>{timeline(record.steps)}</div>}
                                dataSource={this.state.processes}
                                pagination={{pageSize: 30}}
                                scroll={{y: (Math.floor(height) - 100)}}/>
                        );
                    }}
                </ContainerDimensions>
            </section>
        );
    }
}