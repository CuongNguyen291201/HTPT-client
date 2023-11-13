import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Popconfirm, Row, Table } from 'antd';
import ModalChuyenNganh from './ModalChuyenNganh';
import './style.scss';
import SecondNav from '../MainLayout/SecondNav';
import { deleteData, fetchDataCN, showModal } from '../../redux/reducers/chuyennganh.slice';

const ListChuyenNganh = () => {
    const dispatch = useDispatch();
    const { chuyennganh } = useSelector((state) => state.chuyenNganhReducer)

    useEffect(() => {
        dispatch(fetchDataCN());
    }, [])

    return (
        <div className='list-mon-hoc'>
            <h3>Chuyên ngành</h3>
            <Row justify="space-between" gutter={[8, 8]}>
                <Col span={24} sm={24} md={24} lg={18}>
                    <Button onClick={() => dispatch(showModal({ showModal: true }))}>Thêm</Button>
                    <ModalChuyenNganh />
                    <Card
                        size="small"
                        title="Chuyên ngành"
                        className="product"
                        bodyStyle={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}
                    >
                        <Table dataSource={chuyennganh} size="middle" pagination={false}>
                            <Table.Column title="ID" dataIndex="id" />
                            <Table.Column title="Tên" dataIndex="ten" />
                            <Table.Column title="Sửa" render={(_, entity) => <Button onClick={() => { dispatch(showModal({ showModal: true, isUpdate: true, currentEntity: entity })) }}>Cập nhật</Button>} />
                            <Table.Column title="Xóa" render={(_, entity) =>
                                <Popconfirm
                                    title="Bạn chắc chắn muốn xóa chuyên ngành này?"
                                    onConfirm={() => dispatch(deleteData(entity))}
                                    okText="Đồng ý"
                                    cancelText="Không"
                                >
                                    <Button>Xóa</Button>
                                </Popconfirm>}
                            />
                        </Table>
                    </Card>
                </Col>

                <Col className="centered-col" sm={24} md={24} lg={6}>
                    <SecondNav />
                </Col>
            </Row>
        </div>
    )
}

export default ListChuyenNganh