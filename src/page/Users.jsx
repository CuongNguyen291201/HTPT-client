import { Button, Card, Col, Popconfirm, Row, Table } from 'antd'
import React, { useEffect } from 'react'
import Layout from '../component/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../redux/reducers/user.slice'

const Users = () => {
    const dispatch = useDispatch();
    const { listUser } = useSelector(state => state.userReducer);

    useEffect(() => {
        dispatch(getUsers());
    }, [])

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
                            <Table dataSource={listUser} size="middle" pagination={false}>
                                <Table.Column title="Email" dataIndex="email" />
                                <Table.Column title="Name" dataIndex="name" />
                                <Table.Column title="Phone Number" dataIndex="phone" />
                                <Table.Column title="Address" dataIndex="address" />
                                <Table.Column title="" render={(_, user) =>
                                    <Popconfirm
                                        title="Are you sure to delete this user?"
                                        onConfirm={() => dispatch(deleteUser(user._id))}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button>Delete</Button>
                                    </Popconfirm>}
                                />
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Users