import React from 'react'
import Layout from '../component/Layout/Layout'
import { Card, Col, DatePicker, Row, Table } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { handleStatisticOrder } from '../redux/reducers/order.slice';

const { RangePicker } = DatePicker;

const Statistic = () => {
    const dispatch = useDispatch();
    const { statisticOrder, subtotalStatistic } = useSelector((state) => state.orderReducer);

    const handleChooseDate = async (date, dateString) => {
        const startDate = moment(dateString[0]).unix();
        const endDate = moment(dateString[0]).unix();

        dispatch(handleStatisticOrder(startDate, endDate));
    }

    console.log('statisticOrder', statisticOrder)

    return (
        <Layout>
            <div id="" style={{ padding: "20px" }}>
                <h3>Statistic</h3>
                <RangePicker onChange={handleChooseDate} />

                <div style={{ padding: "15px 0" }}>
                    <h2>Total: ${subtotalStatistic}</h2>
                </div>

                <Row gutter={[8, 8]}>
                    <Col span={24} sm={24}>
                        <Card
                            size="small"
                            title=""
                            className="product"
                            bodyStyle={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}
                        >
                            <Table dataSource={statisticOrder} size="middle" pagination={false}>
                                <Table.Column title="Order id" dataIndex="_id" />
                                {/* <Table.Column title="Quantity Item" dataIndex="products" render={(_, product) => <span>{product.products && product.products.length}</span>} />
                                <Table.Column title="Products" dataIndex="products" render={(_, product) => (
                                    product.products && product.products.map(item => <span>{item.name}, </span>)
                                )} /> */}
                                <Table.Column title="Subtotal" dataIndex="products" render={(_, product) => {
                                    let subtotal = product.products.reduce((prev, current) => prev + current.price * current.quantity, 0);
                                    return (
                                        <span>${subtotal}</span>
                                    )
                                }} />
                                <Table.Column title="Date buy" dataIndex="createdAt" render={(_, createdAt) => <span>{moment(createdAt).format("DD-MM-YYYY")}</span>} />
                            </Table>
                        </Card>
                    </Col>
                </Row>

            </div>
        </Layout>
    )
}

export default Statistic