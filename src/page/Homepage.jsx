import React from 'react'
import CarouselHome from '../component/CarouselHome'
import CollectionList from '../component/CollectionList'
import MainLayout from '../component/MainLayout/MainLayout'

const Homepage = () => {
  return (
    <MainLayout>
        <CarouselHome />
        <CollectionList />
    </MainLayout>
  )
}

export default Homepage