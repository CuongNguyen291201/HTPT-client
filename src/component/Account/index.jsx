import { EnvironmentOutlined, MailOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Table } from 'antd'
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiUpdateUserInfo, apiUserLogout } from '../../api/userApi'
import { logoutUser, updateUserInfo } from '../../redux/reducers/user.slice'
import MainLayout from '../MainLayout/MainLayout'
import './style.scss'
import { getOrderByUser } from '../../redux/reducers/order.slice'

const Account = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email, phone, _id } = useSelector((state) => state.userReducer)
    const { orderByUser } = useSelector((state) => state.orderReducer)

    useEffect(() => {
        dispatch(getOrderByUser(_id));
    }, [_id])

    const onFinish = async (values) => {
        const data = await apiUpdateUserInfo(values);

        console.log('data', data)

        if (data) {
            dispatch(updateUserInfo(data));
        }
    }

    const handleLogout = async () => {
        Cookies.remove('token');
        const data = await apiUserLogout();
        if (data) {
            dispatch(logoutUser());
            navigate('/')
        }
    }

    console.log()

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
                                    fields={[
                                        {
                                            name: ["email"],
                                            value: email,
                                        },
                                        {
                                            name: ["phone"],
                                            value: phone
                                        }
                                    ]}
                                    onFinish={onFinish}
                                >
                                    <Row justify="space-around" gutter={[8, 8]}>
                                        <Col sm={24} lg={12}>
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
                                                <Input disabled={true} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                                            </Form.Item>
                                        </Col>

                                        <Col sm={24} lg={12}>
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
                                        </Col>
                                    </Row>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Update
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>

                        <div className="logout" onClick={() => handleLogout()}>Logout</div>

                        <div>
                            <h2>Order History</h2>
                            <Row justify="space-around">
                                <Col sm={24}>
                                    <Table dataSource={orderByUser} size="middle" pagination={false}>
                                        <Table.Column title="Order id" dataIndex="_id" />
                                        <Table.Column title="Quantity Item" dataIndex="products" render={(_, product) => <span>{product.products && product.products.length}</span>} />
                                    </Table>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Account