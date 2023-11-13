import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Popconfirm, Row, Table } from 'antd';
import ModalMonHoc from './ModalMonHoc';
import './style.scss';
import SecondNav from '../MainLayout/SecondNav';
import { deleteData, fetchDataMH, showModal } from '../../redux/reducers/monhoc.slice';
import { fetchDataCN } from '../../redux/reducers/chuyennganh.slice';

const ListMonHoc = () => {
    const dispatch = useDispatch();
    const { monhoc } = useSelector((state) => state.monHocReducer)

    useEffect(() => {
        dispatch(fetchDataMH());
        dispatch(fetchDataCN());
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
                        <Table dataSource={monhoc} size="middle" pagination={false}>
                            <Table.Column title="ID" dataIndex="id" />
                            <Table.Column title="Tên" dataIndex="ten" />
                            <Table.Column title="Số tín chỉ" dataIndex="soTc" />
                            <Table.Column title="Chuyên ngành" dataIndex="chuyenNganh" render={(_, entity) => <span>{entity.chuyenNganh.ten}</span>} />
                            <Table.Column title="Sửa" render={(_, entity) => <Button onClick={() => { console.log('entity kk', entity); dispatch(showModal({ showModal: true, isUpdate: true, currentEntity: entity })) }}>Cập nhật</Button>} />
                            <Table.Column title="Xóa" render={(_, entity) =>
                                <Popconfirm
                                    title="Bạn chắc chắn muốn xóa môn học này?"
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

                <Col className="centered-col" sm={24} md={12} lg={6}>
                    <SecondNav />
                </Col>
            </Row>
        </div>
    )
}

export default ListMonHoc