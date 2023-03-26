import React from 'react'
import CarouselHome from '../component/CarouselHome'
import CollectionList from '../component/CollectionList'
import FeatureProduct from '../component/FeatureProduct'
import MainLayout from '../component/MainLayout/MainLayout'

const Homepage = () => {
    return (
        <MainLayout>
            <CarouselHome />
            <CollectionList />
            <FeatureProduct />
        </MainLayout>
    )
}

export default Homepage