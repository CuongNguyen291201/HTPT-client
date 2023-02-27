import { Carousel } from 'antd'
import React from 'react'
import './style.scss'
import bazaar from "../../media/carousel-images/bazaar.jpg"
import fashion from "../../media/carousel-images/fashion.jpg"
import vinylRecords from "../../media/carousel-images/vinyl-records.jpg"

const CarouselHome = () => {
    return (
        <Carousel autoplay>
            <div>
                <img src={bazaar} />
            </div>
            <div>
                <img src={fashion} />
            </div>
            <div>
                <img src={vinylRecords} />
            </div>
        </Carousel>
    )
}

export default CarouselHome