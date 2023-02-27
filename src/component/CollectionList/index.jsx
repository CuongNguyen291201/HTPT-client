import React from 'react'
import guitar from '../../media/guitar.jpg'
import person from '../../media/person.jpg'
import background from '../../media/guitar.jpg'
import { Card, Col, Layout, Row } from 'antd'

const { Meta } = Card;

const CollectionList = () => {
    return (
        <Layout className="boxed-width">
            <Row className="" gutter={[24, 24]}>
                {[0, 1, 2].map(item => (
                    <Col className="centered-col">
                        <a
                            href="#"
                            key={item.id}
                        >
                            <Card
                                className="category-item-card"
                                hoverable
                                cover={
                                    item ? <img alt="example" src={guitar} /> : null
                                }
                            >
                                <Meta title={item} description="" />
                            </Card>
                        </a>
                    </Col>
                ))}
            </Row>
        </Layout>
    )
}

export default CollectionList