import React, { useEffect } from 'react'
import MainLayout from '../component/MainLayout/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByCollection } from '../redux/reducers/product.slice';
import { useParams } from 'react-router-dom';
import guitar from '../media/guitar.jpg'
import { Button, Card, Col, Row } from 'antd';
import { mapCategory } from '../utils/constrant';


const Collections = () => {
    const dispatch = useDispatch();
    const { productByCollection } = useSelector(state => state.productReducer);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProductByCollection(+id));
    }, [])

    console.log('productByCollection', productByCollection)

    return (
        <MainLayout>
            
            <div>{mapCategory[+id]}</div>
            <Row className="" justify="space-between" gutter={[8, 8]}>
                {productByCollection && productByCollection.map(item => (
                    <Col className="centered-col" key={item._id} sm={24} md={12} lg={5}>
                        <a href={`/product/${item._id}`}>
                            <Card
                                className="category-item-card"
                                hoverable
                                cover={
                                    item ? <img alt="example" src={guitar} /> : null
                                }
                            >
                                <Row>
                                    <h2 style={{ textAlign: 'center' }}>
                                        {item.name}
                                    </h2>
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
        </MainLayout>
    )
}

export default Collections