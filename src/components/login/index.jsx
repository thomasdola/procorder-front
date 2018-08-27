import React, {Component} from 'react';
import axios from 'axios';

import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, {email, password}) => {
      if (!err) {
        console.log('Received values of form: ', email, password);
        axios({
            method: 'post',
            url: '/api/admin/auth/login',
            data: {email, password}
        })
        .then(response => {
            console.log(response.data);
            localStorage.setItem('isLogin', true);
            localStorage.setItem('token', response.data.token);
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Form onSubmit={this.handleSubmit} className="login-form" style={{width: 300}}>
            <FormItem>
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" type="email" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(LoginForm);