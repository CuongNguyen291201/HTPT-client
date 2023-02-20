import {
    ContainerOutlined, MenuFoldOutlined, PieChartOutlined,
    MenuUnfoldOutlined, DesktopOutlined
} from '@ant-design/icons';
import { Button, Menu, Row, Col } from 'antd';
import { useMemo, useState } from 'react';
import { getItem } from '../../helper/getItemMenu';
import { useNavigate } from "react-router-dom";


const Layout = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const items = useMemo(() =>
        [
            getItem('Product', 'product', <PieChartOutlined />),
            getItem('Statistic', 'statistic', <DesktopOutlined />),
            getItem('User', 'user', <ContainerOutlined />),
        ]
        , [])

    const toggleCollapsed = () => setCollapsed(!collapsed);

    const handleTab = (e) => {
        navigate(`/admin/${e.key}`);
    }
    return (
        <>
            <Row gutter={16} style={{ margin: "unset", height: "100vh" }}>
                <Col span={collapsed ? 2 : 4} style={{ padding: "unset" }}>
                    <h3 style={{ color: "#fff" }}>Admin Dashboard</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {!collapsed && <p style={{ color: "#fff" }}>Show and Hide</p>}
                        <Button type="primary" onClick={toggleCollapsed}>
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </Button>
                    </div>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        items={items}
                        onClick={handleTab}
                    />
                </Col>

                <Col span={collapsed ? 22 : 20} style={{ padding: "unset" }}>
                    {props.children}
                </Col>
            </Row>
        </>
    )
}

export default Layout