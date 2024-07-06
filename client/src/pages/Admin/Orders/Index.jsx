import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import { searchOrder, sortOrder } from '../../../redux/slices/orderSlice'
import OrderTableItem from '../../../components/Admin/OrderTableItem/Index'
import { useDataContext } from '../../../context/context';
const Orders = () => {
    const { theme } = useDataContext()

    const dispatch = useDispatch()
    const { orders, loading } = useSelector(state => state.orders)
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders?.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <main className={`managementAdmin  ${theme ? "" : "tableLight"}`}>
            <Helmet>
                <title>Orders</title>
            </Helmet>
            <div className="managementAdminInside">

                <div className='container'>
                    <div className="row">
                        <div className="col-lg-12 managementTableTop">
                            <div className="managementTableTopInside">
                                <div className="managementTableTopInsideBox">
                                    <div className="managementTableTopBoxFilter">
                                        <div className="managementTableTopFilterLeft">
                                            <input type="text" placeholder='Search Order' onChange={(e) => {
                                                dispatch(searchOrder(e.target.value))
                                            }} />
                                        </div>
                                        <div className="managementTableTopFilterRight">
                                            <select  onChange={(e) => {
                                                dispatch(sortOrder(e.target.value))
                                            }}>
                                                <option value="df">All</option>
                                                <optgroup label='User Title'>
                                                    <option value="A-Z">A-Z</option>
                                                    <option value="Z-A">Z-A</option>
                                                </optgroup>
                                                <optgroup label='Total Price'>
                                                    <option value="0-9">0-9</option>
                                                    <option value="9-0">9-0</option>
                                                </optgroup>
                                                <optgroup label='Order Status'>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Accept">Accept</option>
                                                    <option value="Reject">Reject</option>
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
                            loading == true ? <p className='spinnerManagement'>
                                <RingLoader color="#36d7b7" />
                            </p> : <div className='col-lg-12 managementTableCol'>
                                <div className="managementTableColInside">
                                    <div className="managementTableColInsideBox">
                                        <div className="resManagementTable">
                                            <table className='table table-hover' >
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>User Title</th>
                                                        <th>User Gmail</th>
                                                        <th>Total Amount</th>
                                                        <th>Total Price</th>
                                                        <th>Status</th>
                                                        <th>Info</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentItems?.map((item, index) => {
                                                            return <OrderTableItem key={index} index={indexOfFirstItem + index} item={item} />
                                                        })
                                                    }
                                                </tbody>
                                            </table>


                                        </div>
                                        <div className="managementPagination" style={{ display: orders.length > 7 ? "" : "none" }}>
                                            <Pagination
                                                count={Math.ceil(orders.length / itemsPerPage)}
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

export default Orders
