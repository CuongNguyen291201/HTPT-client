import { Card, Col, Row, Table } from 'antd'
import React from 'react'
import Layout from '../component/Layout/Layout'

const Users = () => {
    return (
        <Layout>
            <div id="" style={{ padding: "20px" }}>
                <h3>Users</h3>
                <Row gutter={[8, 8]}>
                    <Col span={24} sm={24}>
                        <Card
                            size="small"
                            title="Users"
                            className="users"
                            bodyStyle={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}
                        >
                            <Table dataSource={[]} size="middle" pagination={false}>
                                <Table.Column title="Name" dataIndex="name" />
                                <Table.Column title="Phone Number" dataIndex="phone" />
                                <Table.Column title="Address" dataIndex="address" />
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Users