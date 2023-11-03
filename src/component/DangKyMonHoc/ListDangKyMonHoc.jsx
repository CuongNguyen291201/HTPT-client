import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../redux/reducers/product.slice';
import { Card, Checkbox, Col, Row, Table } from 'antd';
import './style.scss';
import SecondNav from '../MainLayout/SecondNav';

const ListDangKyMonHoc = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.productReducer)

    useEffect(() => {
        dispatch(fetchProduct());
    }, [])

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
                        <Table dataSource={products} size="middle" pagination={false}>
                            <Table.Column title="ID" dataIndex="id" />
                            <Table.Column title="Năm học" dataIndex="namhoc" />
                            <Table.Column title="Học kỳ" dataIndex="hocky" />
                            <Table.Column title="Số SV tối đa" dataIndex="svtoida" />
                            <Table.Column title="Môn học" dataIndex="monhoc" />
                            <Table.Column title="Chi nhánh" dataIndex="chinhanh" />
                            <Table.Column title="" render={(_, product) => <Checkbox onChange={() => {}}>Checkbox</Checkbox>} />
                            
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