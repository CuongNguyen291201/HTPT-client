import { Button, Col, Descriptions, Row, Typography } from 'antd'
import React from 'react'
import MainLayout from '../MainLayout/MainLayout'
import person from '../../media/person.jpg'
import './style.scss'
import { useSelector } from 'react-redux'

const { Text } = Typography;
const { Item } = Descriptions;

const ProductDetail = () => {
    const { name, email } = useSelector((state) => state.userReducer)

    console.log('name', name)

    return (
        <MainLayout>
            <div className="width-layout">
                <Row justify="space-around">
                    <Col sm={24} lg={12}>
                        <img src={person} />
                    </Col>

                    <Col sm={24} lg={12}>
                        <Descriptions title={"Premium Quality"} column={1}>
                            <Item key="price" label="Price" className="price-description">
                                <Text type="secondary">$12</Text>
                            </Item>
                            <Item key="desc" label="Description">
                                <div>
                                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
                                </div>
                            </Item>
                            <Item key="button" label="">
                                <Button type="primary" onClick={() => { }}>
                                    Add To Cart
                                </Button>
                            </Item>
                        </Descriptions>
                    </Col>
                </Row>
            </div>
        </MainLayout>
    )
}

export default ProductDetail