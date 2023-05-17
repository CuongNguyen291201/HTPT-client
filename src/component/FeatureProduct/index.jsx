import { Button, Card, Col, Row } from 'antd'
import React from 'react'
import guitar from '../../media/guitar.jpg'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../../redux/reducers/product.slice'

const FeatureProduct = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.productReducer);
    useEffect(() => {
        dispatch(fetchProduct());
    }, [])
    
    return (
        <div className="with-layout">
            <p className="title-section">Sản phẩm nổi bật</p>

            <Row className="" justify="space-between" gutter={[8, 8]}>
                {products && products.map(item => (
                    <Col className="centered-col" key={item._id} sm={24} md={12} lg={5}>
                        <a href={`/product/${item._id}`}>
                            <Card
                                className="category-item-card"
                                hoverable
                                cover={<img alt={item.name} src={item.image} />}
                            >
                                <Row>
                                    <h2 style={{ textAlign: 'center' }}>{item.name}</h2>
                                    <Button style={{ marginLeft: 10 }}>Giảm giá!</Button>
                                </Row>
                                <Row>
                                    <p type="secondary">{`$${item.price}`}</p>
                                </Row>
                            </Card>
                        </a>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default FeatureProduct