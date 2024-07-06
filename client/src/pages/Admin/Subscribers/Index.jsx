import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import SubscribersItem from '../../../components/Admin/SubscribersItem/Index'
import { searchSubscribers, sortSubscribers } from '../../../redux/slices/subscribersSlice'
import { useDataContext } from '../../../context/context';
const Subscribers = () => {
    const dispatch = useDispatch()
    const { theme } = useDataContext()

    const { subscribers, loading } = useSelector(state => state.subscribers)
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = subscribers?.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <main className={`managementAdmin  ${theme ? "" : "tableLight"}`}>

            <Helmet>
                <title>Subscribers</title>
            </Helmet>
            <div className="managementAdminInside">

                <div className='container'>
                    <div className="row">
                        <div className="col-lg-12 managementTableTop">
                            <div className="managementTableTopInside">
                                <div className="managementTableTopInsideBox">
                                    <div className="managementTableTopBoxFilter">
                                        <div className="managementTableTopFilterLeft">
                                            <input type="text" placeholder='Search Our Team' onChange={(e) => {
                                                dispatch(searchSubscribers(e.target.value))
                                            }} />
                                        </div>
                                        <div className="managementTableTopFilterRight">
                                            <select onChange={(e) => {
                                                dispatch(sortSubscribers(e.target.value))
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
                                                        <th>Gmail</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentItems?.map((item, index) => {
                                                            return <SubscribersItem key={index} index={indexOfFirstItem + index} item={item} />
                                                        })
                                                    }
                                                </tbody>
                                            </table>


                                        </div>
                                        <div className="managementPagination" style={{ display: subscribers.length > 7 ? "" : "none" }}>
                                            <Pagination
                                                count={Math.ceil(subscribers.length / itemsPerPage)}
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

export default Subscribers
