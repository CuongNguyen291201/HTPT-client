import { Col, Row, Card, Button, Table, Popconfirm, Image } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteProduct, fetchProduct, showModal } from '../redux/reducers/product.slice';
import ModalProduct from '../component/product/ModalProduct';
import Layout from '../component/Layout/Layout';
import { mapCategory } from '../utils/constrant';

const Product = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.productReducer)
    
    useEffect(() => {
        dispatch(fetchProduct());
    }, [])

    return (
        <Layout>
            <div id="" style={{ padding: "20px" }}>
                <h3>Product</h3>
                <Row gutter={[8, 8]}>
                    <Col span={24} sm={24}>
                        <Button onClick={() => dispatch(showModal({ showModal: true }))}>Add</Button>
                        <ModalProduct />
                        <Card
                            size="small"
                            title="Product"
                            className="product"
                            bodyStyle={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}
                        >
                            <Table dataSource={products} size="middle" pagination={false}>
                                <Table.Column title="Name" dataIndex="name" />
                                <Table.Column title="Price" dataIndex="price" />
                                <Table.Column title="Category" dataIndex="category" render={(_, product) => <span>{mapCategory[product.category]}</span>} />
                                <Table.Column title="Description" dataIndex="desc" />
                                <Table.Column title="Short description" dataIndex="shortDesc" />
                                <Table.Column title="Image Sharing" render={(_, product) => <Image  width={200} src={product.image} />} />
                                <Table.Column title="Sửa" render={(_, product) => <Button onClick={() => { dispatch(showModal({ showModal: true, isUpdate: true, currentProduct: product })) }}>Edit</Button>} />
                                <Table.Column title="Xóa" render={(_, product) =>
                                    <Popconfirm
                                        title="Are you sure to delete this product?"
                                        onConfirm={() => dispatch(deleteProduct(product._id))}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button>Delete</Button>
                                    </Popconfirm>}
                                />
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Product