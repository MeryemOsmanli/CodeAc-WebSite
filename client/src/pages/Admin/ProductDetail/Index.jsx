import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PacmanLoader from "react-spinners/PacmanLoader";
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Icon from '@mdi/react';

import { getOneProducts } from '../../../redux/slices/productSlice';
import { useDataContext } from '../../../context/context';


const ProductDetail = () => {
    const dispatch = useDispatch()
    const { theme } = useDataContext()
    const { oneProduct, productsLoading } = useSelector(state => state.products)
    const { id } = useParams()
    useEffect(() => {
        dispatch(getOneProducts(id))
    }, [id])
    return (
        <main className={`managementDetail ${theme ? "" : "lightDetailAdmin1"}`}>

            <Helmet>
                <title>Product Detail</title>
            </Helmet>
            <div className="managementDetailInside">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="managementDetailInsideCard">
                                {
                                    productsLoading == true ? <p className='managementDetailSpinner'>
                                        <PacmanLoader color="#6c7293 " /></p> : <div className="managementDetailInsideCardBox">
                                        <div className="managementDetailCardBoxTop">
                                            <img src={oneProduct.images} alt="" />
                                            <div className="managementAbout">
                                                <p>
                                                    {oneProduct?.title}
                                                </p>
                                                <span>
                                                    {oneProduct?.type}
                                                </span>
                                                <div>
                                                    <span> {oneProduct?.flavour}</span>
                                                </div>
                                                <div>
                                                    <span> ${oneProduct?.price}</span>
                                                </div>
                                                <div>
                                                    <span>{oneProduct?.cal} Cal </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='productDetailBottom'>
                                            <p>
                                                {oneProduct?.description}
                                            </p>
                                        </div>
                                        <button className="managementGoBackBtn btn btn-dark">
                                            <Link to={'/admin/products'}>
                                                Go Back
                                            </Link>
                                        </button>


                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductDetail

