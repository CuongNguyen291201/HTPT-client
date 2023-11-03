import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProduct, showModal } from '../../redux/reducers/product.slice';
import { Button, Card, Col, Popconfirm, Row, Table } from 'antd';
import ModalLopHocPhan from './ModalLopHocPhan';
import './style.scss';
import SecondNav from '../MainLayout/SecondNav';

const ListLopHocPhan = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.productReducer)

    useEffect(() => {
        dispatch(fetchProduct());
    }, [])

    return (
        <div className='list-mon-hoc'>
            <h3>Lớp học phần</h3>
            <Row justify="space-between" gutter={[8, 8]}>
                <Col span={24} sm={24} md={12} lg={18}>
                    <Button onClick={() => dispatch(showModal({ showModal: true }))}>Thêm</Button>
                    <ModalLopHocPhan />
                    <Card
                        size="small"
                        title="Lớp học phần"
                        className="product"
                        bodyStyle={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}
                    >
                        <Table dataSource={products} size="middle" pagination={false}>
                            <Table.Column title="ID" dataIndex="id" />
                            <Table.Column title="Năm học" dataIndex="namhoc" />
                            <Table.Column title="Học kỳ" dataIndex="hocky" />
                            <Table.Column title="Số SV tối đa" dataIndex="svtoida" />
                            <Table.Column title="Môn học" dataIndex="monhoc" />
                            <Table.Column title="Chi nhánh" dataIndex="chinhanh" />
                            <Table.Column title="Sửa" render={(_, product) => <Button onClick={() => { dispatch(showModal({ showModal: true, isUpdate: true, currentProduct: product })) }}>Cập nhật</Button>} />
                            <Table.Column title="Xóa" render={(_, product) =>
                                <Popconfirm
                                    title="Bạn chắc chắn muốn xóa lớp học phần này?"
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

export default ListLopHocPhan