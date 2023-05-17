import React from 'react'
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined, EnvironmentOutlined, MailOutlined  } from '@ant-design/icons';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/reducers/user.slice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { apiUserRegister } from '../../api/userApi';
import useAuth from '../../hook/UseAuth';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email } = useSelector((state) => state.userReducer)


    useAuth({ authen: email ? "/" : false, unAuthen: false })

    const onFinish = async (values) => {
        const { _user, access_token, refresh_token } = await apiUserRegister(values);
        if (_user) {
            Cookies.set('token', refresh_token, { expires: 7 });
            dispatch(registerUser({ _user, access_token, refresh_token }))
            navigate('/')
        } else {
            notification.error({ message: "Có lỗi, bạn hãy kiểm tra lại!!" });
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
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập đủ thông tin',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập đủ thông tin',
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
                            message: 'Hãy nhập đủ thông tin',
                        },
                    ]}
                >
                    <Input prefix={<EnvironmentOutlined className="site-form-item-icon" />} placeholder="Địa chỉ" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập đủ thông tin',
                        },
                    ]}
                >
                    <Input prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="SĐT" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập đủ thông tin',
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
                        Đăng ký
                    </Button>
                    Hoặc <a href="/login">đăng nhập ngay!</a>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register