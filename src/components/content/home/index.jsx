import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, withRouter} from 'react-router-dom';
import Chart from './chart';
import Processes from './processes';
import Process from './processes/process';
import _isEqual from "lodash/isEqual";

class MainHome extends Component {
    state = {
        selectedMenuKey: 1
    };

    static getDerivedStateFromProps(nextProps, prevState){
        const {location: {pathname}} = nextProps;
        const menuKey = MainHome.getMenuKeyFromPathname(pathname);

        if(_isEqual(menuKey, prevState.selectedMenuKey))
            return null;

        return {
            selectedMenuKey: menuKey
        };
    }

    static getMenuKeyFromPathname(pathname){
        switch(pathname){
            case "/processes/list":
                return 1;
            case "/processes/chart":
                return 2;
            case "/processes/view":
                return 3;
            default:
                return 1;
        }
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                {/* <header style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50}}>
                    <ButtonGroup>
                        <Button type={selectedMenuKey === 1 ? 'primary' : 'normal'}
                                onClick={() => push('/processes/list')}
                                size={'large'}>
                            <Icon type="bars" /> List
                        </Button>
                        <Button type={selectedMenuKey === 2 ? 'primary' : 'normal'}
                                onClick={() => push('/processes/chart')}
                                size={'large'}>
                            <Icon type="area-chart" /> Chart
                        </Button>
                        <Button type={selectedMenuKey === 3 ? 'primary' : 'normal'}
                                onClick={() => push('/processes/view')}
                                size={'large'}>
                            <Icon type="bars" /> View
                        </Button>
                        <Button type="normal"
                                onClick={() => console.log("exporting")}
                                size={'large'}>
                            <Icon type="export" /> Export
                        </Button>
                    </ButtonGroup>
                </header> */}
                <Route path="/processes/chart" component={Chart}/>
                <Route path="/processes/list" component={Processes}/>
                <Route path="/processes/view" component={Process}/>
            </div>
        );
    }

    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired
    };
}

export default withRouter(MainHome);
