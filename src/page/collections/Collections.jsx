import React, { useEffect } from 'react'
import MainLayout from '../../component/MainLayout/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByCollection } from '../../redux/reducers/product.slice';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from 'antd';
import { mapCategory } from '../../utils/constrant';
import './style.scss';

const Collections = () => {
    const dispatch = useDispatch();
    const { productByCollection } = useSelector(state => state.productReducer);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProductByCollection(+id));
    }, [])

    return (
        <MainLayout>
            <div className="main-collection">
                <div className="title-collection">{mapCategory[+id]}</div>
                <Row className="" justify="space-between">
                    {productByCollection && productByCollection.map(item => (
                        <Col className="centered-col" key={item._id} sm={24} md={12} lg={5}>
                            <a href={`/product/${item._id}`}>
                                <Card
                                    className="category-item-card"
                                    hoverable
                                    cover={<img alt={item.name} src={item.image} />}
                                >
                                    <Row>
                                        <h2 style={{ textAlign: 'center' }}>{item.name}</h2>
                                        <Button style={{ marginLeft: 10 }}>Sale!</Button>
                                    </Row>
                                    <Row>
                                        <p type="secondary">
                                            {`$${item.price}`}
                                        </p>
                                    </Row>
                                </Card>
                            </a>
                        </Col>
                    ))}
                </Row>
            </div>
        </MainLayout>
    )
}

export default Collections