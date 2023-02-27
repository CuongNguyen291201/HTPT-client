import React from 'react'
import { Layout, Row, Col, Badge } from 'antd';
import { ShoppingCartOutlined, GithubOutlined } from '@ant-design/icons';
import './style.scss';

const { Header } = Layout;

const MainNav = () => {
    return (
        <Header>
            <Row justify="space-between" className="main-nav">
                <Col span={2}>
                    <div className="left-nav-items">
                        <a target="_blank" href="/">
                            <GithubOutlined style={{ fontSize: 25, cursor: 'pointer' }} />
                        </a>
                        <a href="/">Home</a>
                    </div>
                </Col>
                <Col span={2} style={{ textAlign: 'right' }}>
                    <a href="/cart">
                        <div>
                            <Badge
                                count={2}
                                style={{
                                    backgroundColor: '#fff',
                                    color: '#999',
                                    boxShadow: '0 0 0 1px #d9d9d9 inset',
                                }}
                            >
                                <ShoppingCartOutlined
                                    style={{ fontSize: 25, cursor: 'pointer', color: '#fff' }}
                                />
                            </Badge>
                        </div>
                    </a>
                </Col>
            </Row>
        </Header>
    )
}

export default MainNav