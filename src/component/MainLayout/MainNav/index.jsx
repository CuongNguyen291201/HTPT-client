import React from 'react'
import { Layout, Row, Col, Badge } from 'antd';
import { ShoppingCartOutlined, GithubOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import './style.scss';
import { useSelector } from 'react-redux';

const { Header } = Layout;

const MainNav = () => {
    const { email, cart } = useSelector((state) => state.userReducer)

    return (
        <Header>
            <Row justify="space-between" className="main-nav">
                <Col span={2}>
                    <div className="left-nav-items">
                        <a href="/">
                            <GithubOutlined style={{ fontSize: 25, cursor: 'pointer' }} />
                        </a>
                        <a href="/">Home</a>
                    </div>
                </Col>
                <Col span={2} style={{ textAlign: 'right' }}>
                    <div className="user">
                        <div>
                            <a href={`${email ? "/profile" : "/login"}`}>
                                <UserOutlined style={{ fontSize: 25, cursor: 'pointer', color: '#fff' }} />
                            </a>
                        </div>
                        <div>
                            <a href="/search">
                                <SearchOutlined style={{ fontSize: 25, cursor: 'pointer', color: '#fff' }} />
                            </a>
                        </div>
                        <div>
                            <a href="/cart">
                                <Badge count={cart ? cart.length : 0}
                                    style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
                                >
                                    <ShoppingCartOutlined style={{ fontSize: 25, cursor: 'pointer', color: '#fff' }} />
                                </Badge>
                            </a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Header>
    )
}

export default MainNav