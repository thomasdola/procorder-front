import React, {Component} from 'react';
import axios from 'axios';

import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class NewDeviceForm extends Component {
    
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, {email, phone}) => {
      if (!err) {
        console.log('Received values of form: ', email, phone);
        axios({
            method: 'post',
            url: '/api/admin/devices',
            data: {email, phone},
            headers: {'Authorization': "bearer " + localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response.data);
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
      <Form onSubmit={this.handleSubmit} className="login-form" style={{width: 300}}>
        <FormItem>
            {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
            })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" type="email" />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your Phone!' }],
            })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="tel" placeholder="Official Phone" />
            )}
        </FormItem>
        <FormItem>
            <Button type="primary" htmlType="submit">
                Add Device
            </Button>
        </FormItem>
    </Form>
    );
  }
}

export default Form.create()(NewDeviceForm);