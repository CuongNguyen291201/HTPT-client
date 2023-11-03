import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProduct, showModal } from '../../redux/reducers/product.slice';
import { Button, Card, Col, Popconfirm, Row, Table } from 'antd';
import ModalMonHoc from './ModalMonHoc';
import './style.scss';
import SecondNav from '../MainLayout/SecondNav';

const ListMonHoc = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.productReducer)

    useEffect(() => {
        dispatch(fetchProduct());
    }, [])

    return (
        <div className='list-mon-hoc'>
            <h3>Môn học</h3>
            <Row justify="space-between" gutter={[8, 8]}>
                <Col span={24} sm={24} md={12} lg={18}>
                    <Button onClick={() => dispatch(showModal({ showModal: true }))}>Thêm</Button>
                    <ModalMonHoc />
                    <Card
                        size="small"
                        title="Môn học"
                        className="product"
                        bodyStyle={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}
                    >
                        <Table dataSource={products} size="middle" pagination={false}>
                            <Table.Column title="ID" dataIndex="id" />
                            <Table.Column title="Tên" dataIndex="ten" />
                            <Table.Column title="Số tín chỉ" dataIndex="soTc" />
                            <Table.Column title="Chuyên ngành" dataIndex="chuyenNganh" />
                            <Table.Column title="Sửa" render={(_, product) => <Button onClick={() => { dispatch(showModal({ showModal: true, isUpdate: true, currentProduct: product })) }}>Cập nhật</Button>} />
                            <Table.Column title="Xóa" render={(_, product) =>
                                <Popconfirm
                                    title="Bạn chắc chắn muốn xóa môn học này?"
                                    onConfirm={() => dispatch(deleteProduct(product._id))}
                                    okText="Đồng ý"
                                    cancelText="Không"
                                >
                                    <Button>Xóa</Button>
                                </Popconfirm>}
                            />
                        </Table>
                    </Card>
                </Col>

                <Col className="centered-col" sm={24} md={12} lg={6}>
                    <SecondNav />
                </Col>
            </Row>
        </div>
    )
}

export default ListMonHoc