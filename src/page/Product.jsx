import { Col, Row, Card, Button, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { showModal } from '../redux/reducers/product.slice';
import ModalProduct from '../component/product/ModalProduct';
import Layout from '../component/Layout/Layout';

const Product = () => {
    const [currentProduct, setCurrentProduct] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(fetchWebSeo());
        // dispatch(fetchAppSettings());
    }, [])

    return (
        <Layout>
            <div id="" style={{ padding: "20px" }}>
                <h3>Product</h3>
                <Row gutter={[8, 8]}>
                    <Col span={24} sm={24}>
                        <Button onClick={() => dispatch(showModal({ showModal: true }))}>Thêm</Button>
                        <ModalProduct />
                        <Card
                            size="small"
                            title="Product"
                            className="product"
                            bodyStyle={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}
                        >
                            <Table dataSource={[]} size="middle" pagination={false}>
                                <Table.Column title="Name" dataIndex="name" />
                                <Table.Column title="Price" dataIndex="price" />
                                <Table.Column title="Description" dataIndex="desc" />
                                {/* <Table.Column title="Image Sharing" render={(_, webSeo) => <Image width={200} src={webSeo.imageSharing} />} />
                                <Table.Column title="Sửa" render={(_, webSeo) => <Button onClick={() => { dispatch(showModal({ showModal: true, isUpdate: true, currentWebSeo: webSeo })) }}>Sửa</Button>} />
                                <Table.Column title="Xóa" render={(_, webSeo) =>
                                    <Popconfirm
                                        title="Are you sure to delete this Web Seo?"
                                        onConfirm={() => dispatch(deleteWebSeo(webSeo._id))}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button>Xóa</Button>
                                    </Popconfirm>}
                                /> */}
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Product