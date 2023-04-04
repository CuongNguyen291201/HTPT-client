import React, { useEffect } from 'react'
import MainLayout from '../component/MainLayout/MainLayout'
import { useDispatch } from 'react-redux'
import { getProductByCollection } from '../redux/reducers/product.slice';

const Collections = () => {
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getProductByCollection(1));
    
        
    }, [])
    

    return (
        <MainLayout>
            <div>collection</div>
        </MainLayout>
    )
}

export default Collections