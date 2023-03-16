import React from 'react'
import { useSelector } from 'react-redux'
import CarouselHome from '../component/CarouselHome'
import CollectionList from '../component/CollectionList'
import FeatureProduct from '../component/FeatureProduct'
import MainLayout from '../component/MainLayout/MainLayout'

const Homepage = () => {

    const { name, email } = useSelector((state) => state.userReducer)

    console.log('email', email)

    return (
        <MainLayout>
            <CarouselHome />
            <CollectionList />
            <FeatureProduct />
        </MainLayout>
    )
}

export default Homepage