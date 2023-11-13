import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Popconfirm, Row, Table } from 'antd';
import ModalLopHocPhan from './ModalLopHocPhan';
import './style.scss';
import SecondNav from '../MainLayout/SecondNav';
import { deleteData, fetchDataLHP, showModal } from '../../redux/reducers/lophocphan.slice';
import { fetchDataMH } from '../../redux/reducers/monhoc.slice';
import { fetchDataCHN } from '../../redux/reducers/chinhanh.slice';

const ListLopHocPhan = () => {
    const dispatch = useDispatch();
    const { lophocphan } = useSelector((state) => state.lopHocPhanReducer)

    useEffect(() => {
        dispatch(fetchDataLHP());
        dispatch(fetchDataMH());
        dispatch(fetchDataCHN());
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
                        <Table dataSource={lophocphan} size="middle" pagination={false}>
                            <Table.Column title="ID" dataIndex="id" />
                            <Table.Column title="Năm học" dataIndex="namHoc" />
                            <Table.Column title="Học kỳ" dataIndex="hocKy" />
                            <Table.Column title="Số SV tối đa" dataIndex="svToiDa" />
                            <Table.Column title="Môn học" dataIndex="monhoc" render={(_, entity) => <span>{entity?.monHoc?.ten}</span> } />
                            <Table.Column title="Chi nhánh" dataIndex="chinhanh" render={(_, entity) =><span>{entity?.chiNhanh?.ten}</span>} />
                            <Table.Column title="Sửa" render={(_, entity) => <Button onClick={() => { dispatch(showModal({ showModal: true, isUpdate: true, currentEntity: entity })) }}>Cập nhật</Button>} />
                            <Table.Column title="Xóa" render={(_, entity) =>
                                <Popconfirm
                                    title="Bạn chắc chắn muốn xóa lớp học phần này?"
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

export default ListLopHocPhan