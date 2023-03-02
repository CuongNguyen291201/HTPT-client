import { Button, Card, Col, Row } from 'antd'
import React from 'react'
import guitar from '../../media/guitar.jpg'


const FeatureProduct = () => {
    return (
        <div className="with-layout">
            <p className="title-section">Feature Product</p>

            <Row className="" justify="space-between" gutter={[8, 8]}>
                {[1, 2, 3, 4].map(item => (
                    <Col className="centered-col" key={item} sm={24} md={12} lg={5}>
                        <a href="#">
                            <Card
                                className="category-item-card"
                                hoverable
                                cover={
                                    item ? <img alt="example" src={guitar} /> : null
                                }
                            >
                                <Row>
                                    <h2 style={{ textAlign: 'center' }} strong>
                                        {item}
                                    </h2>
                                    <Button style={{ marginLeft: 10 }}>Sale!</Button>
                                </Row>
                                <Row>
                                    <p type="secondary">
                                        {`$${item}`}
                                    </p>
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