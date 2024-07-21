import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { searchOurTeam, sortOurTeam } from '../../../redux/slices/ourTeamSlice'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import OurTeamTableItem from '../../../components/Admin/OurTeamItem/Index'
import { useDataContext } from '../../../context/context'
const OurTeam = () => {
    const dispatch = useDispatch()
    const { theme } = useDataContext()
    const { ourTeam, ourTeamLoading } = useSelector(state => state.ourTeam)
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ourTeam?.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <main className={`managementAdmin  ${theme ? "" : "tableLight"}`}>
            <Helmet>
                <title>Our Team</title>
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
                                                dispatch(searchOurTeam(e.target.value))
                                            }} />
                                        </div>
                                        <div className="managementTableTopFilterRight">
                                            <select onChange={(e) => {
                                                dispatch(sortOurTeam(e.target.value))
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
                            ourTeamLoading == true ? <p className='spinnerManagement'>
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
                                                        <th>Team Title</th>
                                                        <th>Team Profession</th>
                                                        <th>Detail</th>
                                                        <th>Update</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentItems?.map((item, index) => {
                                                            return <OurTeamTableItem key={index} index={indexOfFirstItem + index} item={item} />
                                                        })
                                                    }
                                                </tbody>
                                            </table>


                                        </div>
                                        <div className="managementPagination" style={{ display: ourTeam.length > 7 ? "" : "none" }}>
                                            <Pagination
                                                count={Math.ceil(ourTeam.length / itemsPerPage)}
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

export default OurTeam
