import React from 'react'
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.scss'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/reducers/user.slice';
import { apiUserLogin } from '../../api/userApi';
import { useNavigate } from 'react-router';
import useAuth from '../../hook/UseAuth';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email } = useSelector((state) => state.userReducer)

    useAuth({ authen: email ? "/" : false, unAuthen: false })

    const onFinish = async (values) => {
        const { _user, access_token, refresh_token } = await apiUserLogin(values);
        if (_user) {
            Cookies.set('token', refresh_token, { expires: 7 });
            dispatch(loginUser({ _user, access_token, refresh_token }))
            navigate('/')
        } else {
            notification.error({ message: "Tài khoản hoặc mật khẩu không đúng, bạn hãy kiểm tra lại!!" });
        }
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
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập đúng email!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập đủ thông tin!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật khẩu"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Đăng nhập
                    </Button>
                    Hoặc <a href="/register">đăng ký ngay!</a>
                </Form.Item>
            </Form>

            <div className="back-to-home">
                <a href="/">Trang chủ</a>
            </div>
        </div>
    )
}

export default Login