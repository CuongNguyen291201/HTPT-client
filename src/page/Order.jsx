import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getAllOrders } from '../redux/reducers/order.slice';
import moment from 'moment';
import { Button, Card, Col, Popconfirm, Row, Table } from 'antd';
import Layout from '../component/Layout/Layout';

const Order = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.orderReducer)

    useEffect(() => {
        dispatch(getAllOrders());
    }, [])

    return (
        <Layout>
            <div id="" style={{ padding: "20px" }}>
                <h3>Order</h3>
                <Row gutter={[8, 8]}>
                    <Col span={24} sm={24}>
                        <Card
                            size="small"
                            title="Order"
                            className="product"
                            bodyStyle={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}
                        >
                            <Table dataSource={orders} size="middle" pagination={false}>
                                <Table.Column title="Order id" dataIndex="_id" />
                                <Table.Column title="Quantity Item" dataIndex="products" render={(_, product) => <span>{product.products && product.products.length}</span>} />
                                <Table.Column title="Products" dataIndex="products" render={(_, product) => (
                                    product.products && product.products.map(item => <span>{item.name}, </span>)
                                )} />
                                <Table.Column title="Subtotal" dataIndex="products" render={(_, product) => {
                                    let subtotal = product.products.reduce((prev, current) => prev + current.price * current.quantity, 0);
                                    return (
                                        <span>${subtotal}</span>
                                    )
                                }} />
                                <Table.Column title="Date buy" dataIndex="createdAt" render={(_, createdAt) => <span>{moment(createdAt).format("DD-MM-YYYY")}</span>} />
                                <Table.Column title="" render={(_, order) =>
                                    <Popconfirm
                                        title="Are you sure to delete this order?"
                                        onConfirm={() => dispatch(deleteOrder(order._id))}
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

export default Order