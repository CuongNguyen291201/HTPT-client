import React from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.scss'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/reducers/user.slice';
import { apiUserLogin } from '../../api/userApi';
import { useNavigate } from 'react-router';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { _user, access_token, refresh_token } = await apiUserLogin(values);
        Cookies.set('token', refresh_token, { expires: 7 });
        dispatch(loginUser({ _user, access_token, refresh_token }))
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
                        Log in
                    </Button>
                    Or <a href="/register">register now!</a>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login