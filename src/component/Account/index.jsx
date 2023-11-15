import { EnvironmentOutlined, MailOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Table } from 'antd'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiUpdateUserInfo, apiUserLogout } from '../../api/userApi'
import { logoutUser, updateUserInfo } from '../../redux/reducers/user.slice'
import MainLayout from '../MainLayout/MainLayout'
import './style.scss'
// import { getOrderByUser } from '../../redux/reducers/order.slice'
import moment from 'moment'

const Account = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState(JSON.parse(Cookies.get('user')))

    // const { role, address, name, email, phone, _id } = useSelector((state) => state.userReducer)
    // const { orderByUser } = useSelector((state) => state.orderReducer)

    // useEffect(() => {
    //     dispatch(getOrderByUser(_id));
    // }, [_id])

    // const onFinish = async (values) => {
    //     const data = await apiUpdateUserInfo({ _id, ...values });
    //     if (data) {
    //         dispatch(updateUserInfo(data));
    //     }
    // }

    const handleLogout = async () => {
        Cookies.remove('user');
        navigate('/')

        // const data = await apiUserLogout();
        // if (data) {
        //     dispatch(logoutUser());
        //     navigate('/')
        // }
    }

    return (
        <MainLayout>
            <div className="layout">
                <div className="width-layout">
                    <div className="content-layout">
                        <Row justify="space-around">
                            <Col sm={24} lg={4}>
                                <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-16uqvxn" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="AccountCircleIcon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></svg>
                            </Col>
                            <Col sm={24} lg={20}>
                                <Form
                                    className="profile-form"
                                    initialValues={{
                                        remember: true,
                                    }}
                                // onFinish={onFinish}
                                >
                                    <Row justify="space-around" gutter={[8, 8]}>
                                        <Col sm={24} lg={12}>
                                            <Form.Item name="name">
                                                <span>Tên: {user.ten}</span>
                                            </Form.Item>
                                            <Form.Item name="email">
                                                <span>Email: {user.email}</span>
                                            </Form.Item>
                                        </Col>

                                        <Col sm={24} lg={12}>
                                            <Form.Item name="address">
                                                <span>Ngày sinh: {user.ngaySinh}</span>
                                            </Form.Item>
                                            <Form.Item
                                                name="phone"
                                            >
                                                <span>Chi nhánh: {user.chiNhanh.ten}</span>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>

                        <div className="logout" onClick={() => handleLogout()}>Đăng xuất</div>

                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Account