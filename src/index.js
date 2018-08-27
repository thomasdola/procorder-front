import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'antd/dist/antd.css';
// import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.isLogin = localStorage.getItem('isLogin') || false;

export const toHHMMSS = sec => {
    var sec_num = parseInt(sec, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    
    return hours+':'+minutes+':'+seconds;
}

ReactDOM.render(
    <Router>
        <Route path={"/"} component={App}/>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
