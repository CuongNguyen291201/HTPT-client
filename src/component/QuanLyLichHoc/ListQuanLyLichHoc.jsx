import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Popconfirm, Row, Table } from 'antd';
import ModalQuanLyLichHoc from './ModalQuanLyLichHoc';
import './style.scss';
import SecondNav from '../MainLayout/SecondNav';
import { deleteData, fetchDataLH, showModal } from '../../redux/reducers/lichhoc.slice';

const ListQuanLyLichHoc = () => {
    const dispatch = useDispatch();
    const { lichhoc } = useSelector((state) => state.lichHocReducer)

    useEffect(() => {
        dispatch(fetchDataLH());
    }, [])

    return (
        <div className='list-mon-hoc'>
            <h3>Quản lý lịch học</h3>
            <Row justify="space-between" gutter={[8, 8]}>
                <Col span={24} sm={24} md={12} lg={18}>
                    <Button onClick={() => dispatch(showModal({ showModal: true }))}>Thêm</Button>
                    <ModalQuanLyLichHoc />
                    <Card
                        size="small"
                        title="Quản lý lịch học"
                        className="product"
                        bodyStyle={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}
                    >
                        <Table dataSource={lichhoc} size="middle" pagination={false}>
                            <Table.Column title="ID" dataIndex="id" />
                            <Table.Column title="Thứ" dataIndex="thu" />
                            <Table.Column title="Kíp" dataIndex="kip" />
                            <Table.Column title="Phòng" dataIndex="phong" />
                            <Table.Column title="Giảng viên" dataIndex="giangvien" />
                            <Table.Column title="Lớp học phần" dataIndex="lophocphan" />
                            <Table.Column title="Sửa" render={(_, entity) => <Button onClick={() => { dispatch(showModal({ showModal: true, isUpdate: true, currentEntity: entity })) }}>Cập nhật</Button>} />
                            <Table.Column title="Xóa" render={(_, entity) =>
                                <Popconfirm
                                    title="Bạn chắc chắn muốn xóa lịch học này?"
                                    onConfirm={() => dispatch(deleteData(entity.id))}
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

export default ListQuanLyLichHoc