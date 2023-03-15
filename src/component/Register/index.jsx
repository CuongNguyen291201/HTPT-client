import React from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined, EnvironmentOutlined, MailOutlined  } from '@ant-design/icons';
import './style.scss'
import { useDispatch } from 'react-redux';
import { userRegister } from '../../redux/reducers/user.slice';

const Register = () => {
    const dispatch = useDispatch();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        dispatch(userRegister(values));
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
                    name="name"
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
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
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