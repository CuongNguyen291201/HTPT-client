import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined, EnvironmentOutlined, MailOutlined  } from '@ant-design/icons';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, userRegister } from '../../redux/reducers/user.slice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { apiUserRegister } from '../../api/userApi';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        // dispatch(userRegister(values));
        const { _user, access_token, refresh_token } = await apiUserRegister(values);
        Cookies.set('token', refresh_token, { expires: 7 });
        dispatch(registerUser({ _user, access_token, refresh_token }))
        console.log('_user', _user)
        
        navigate('/')
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