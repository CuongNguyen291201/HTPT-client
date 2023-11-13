import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Checkbox, Col, Row, Table } from 'antd';
import './style.scss';
import SecondNav from '../MainLayout/SecondNav';
import { create, deleteData, fetchDataDK } from '../../redux/reducers/dangky.slice';
import { fetchDataLH } from '../../redux/reducers/lichhoc.slice';

const ListDangKyMonHoc = () => {
    const dispatch = useDispatch();
    // const { dangky } = useSelector(state => state.dangKyReducer);
    const { lichhoc } = useSelector(state => state.lichHocReducer);

    useEffect(() => {
        // dispatch(fetchDataDK());
        dispatch(fetchDataLH());
    }, [])

    const handleDK = (e, entity) => {
        if (e.target.checked) {
            dispatch(create(entity));
        } else {
            dispatch(deleteData(entity));
        }
    }

    return (
        <div className='list-mon-hoc'>
            <h3>Đăng ký học phần</h3>
            <Row justify="space-between" gutter={[8, 8]}>
                <Col span={24} sm={24} md={12} lg={18}>
                    <Card
                        size="small"
                        title="Đăng ký học phần"
                        className="product"
                        bodyStyle={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}
                    >
                        <Table dataSource={lichhoc} size="middle" pagination={false}>
                            <Table.Column title="ID" dataIndex="id" />
                            <Table.Column title="Năm học" dataIndex="namHoc" />
                            <Table.Column title="Học kỳ" dataIndex="hocKy" />
                            <Table.Column title="Số SV tối đa" dataIndex="svToiDa" />
                            <Table.Column title="Môn học" dataIndex="monhoc" render={(_, entity) => <span>{entity?.monHoc}</span>} />
                            <Table.Column title="Chi nhánh" dataIndex="chinhanh" />
                            <Table.Column title="" render={(_, entity) => <Checkbox onChange={(e) => handleDK(e, entity)}>Checkbox</Checkbox>} />
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

export default ListDangKyMonHoc