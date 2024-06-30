import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import { searchProducts, sortProducts } from '../../../redux/slices/productSlice'
import ProductTableItem from '../../../components/Admin/ProductItem/Index';
import { useDataContext } from '../../../context/context';
const ProductsTable = () => {
    const { theme } = useDataContext()
    const dispatch = useDispatch()
    const { products, productsLoading } = useSelector(state => state.products)
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products?.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <main className={`managementAdmin  ${theme ? "" : "tableLight"}`}>
            <Helmet>
                <title>Products</title>
            </Helmet>
            <div className="managementAdminInside">

                <div className='container'>
                    <div className="row">
                        <div className="col-lg-12 managementTableTop">
                            <div className="managementTableTopInside">
                                <div className="managementTableTopInsideBox">
                                    <div className="managementTableTopBoxFilter">
                                        <div className="managementTableTopFilterLeft">
                                            <input type="text" placeholder='Search Products' onChange={(e) => {
                                                dispatch(searchProducts(e.target.value))
                                            }} />
                                        </div>
                                        <div className="managementTableTopFilterRight">
                                            <select onChange={(e) => {
                                                dispatch(sortProducts(e.target.value))
                                            }}>
                                                <option hidden disabled value={''} defaultValue={''} >Filter</option>
                                                <option value={'df'}>Default</option>
                                                <optgroup label='Filter By Team Title'>
                                                    <option value={'A-Z'}>A-Z</option>
                                                    <option value={'Z-A'}>Z-A</option>
                                                </optgroup>


                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container container2'>
                    <div className="row">
                        {
                            productsLoading == true ? <p className='spinnerManagement'>
                                <RingLoader color="#36d7b7" />
                            </p> : <div className='col-lg-12 managementTableCol'>
                                <div className="managementTableColInside">
                                    <div className="managementTableColInsideBox">
                                        <div className="resManagementTable">
                                            <table className='table table-hover' >
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Image</th>
                                                        <th> Title</th>
                                                        <th>Flavour</th>
                                                        <th>Price</th>
                                                        <th>Detail</th>
                                                        <th>Update</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentItems?.map((item, index) => {
                                                            return <ProductTableItem key={index} index={indexOfFirstItem + index} item={item} />
                                                        })
                                                    }
                                                </tbody>
                                            </table>


                                        </div>
                                        <div className="managementPagination" style={{ display: products.length > 7 ? "" : "none" }}>
                                            <Pagination
                                                count={Math.ceil(products.length / itemsPerPage)}
                                                page={currentPage}
                                                onChange={handlePageChange}
                                                color="primary" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductsTable
