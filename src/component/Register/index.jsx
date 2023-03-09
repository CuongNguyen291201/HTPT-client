import React from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined, EnvironmentOutlined } from '@ant-design/icons';
import './style.scss'

const Register = () => {
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Address!',
                        },
                    ]}
                >
                    <Input prefix={<EnvironmentOutlined className="site-form-item-icon" />} placeholder="Address" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Phone!',
                        },
                    ]}
                >
                    <Input prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="Phone" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                    </Button>
                    Or <a href="/login">login now!</a>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register