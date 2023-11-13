import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Popconfirm, Row, Table } from 'antd';
import './style.scss';
import SecondNav from '../MainLayout/SecondNav';
import { fetchDataLH } from '../../redux/reducers/lichhoc.slice';

const ListLichHoc = () => {
    const dispatch = useDispatch();
    const { lichhoc } = useSelector((state) => state.lichHocReducer)

    useEffect(() => {
        dispatch(fetchDataLH());
    }, [])

    return (
        <div className='list-mon-hoc'>
            <h3>Lịch học</h3>
            <Row justify="space-between" gutter={[8, 8]}>
                <Col span={24} sm={24} md={12} lg={18}>
                    <Card
                        size="small"
                        title="Lịch học"
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

export default ListLichHoc