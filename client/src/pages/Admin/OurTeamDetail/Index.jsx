import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PacmanLoader from "react-spinners/PacmanLoader";
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Icon from '@mdi/react';
import { getOneOurTeam } from '../../../redux/slices/ourTeamSlice';
import { useDataContext } from '../../../context/context';


const OurTeamDetail = () => {
    const dispatch = useDispatch()
    const { theme } = useDataContext()
    const { oneOurTeam, ourTeamLoading } = useSelector(state => state.ourTeam)
    const { id } = useParams()
    useEffect(() => {
        dispatch(getOneOurTeam(id))
    }, [id])
    return (
        <main className={`managementDetail ${theme ? "" : "lightDetailAdmin1"}`}>

            <Helmet>
                <title>Team Detail</title>
            </Helmet>
            <div className="managementDetailInside">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="managementDetailInsideCard">
                                {
                                    ourTeamLoading == true ? <p className='managementDetailSpinner'>
                                        <PacmanLoader color="#6c7293 " /></p> : <div className="managementDetailInsideCardBox">
                                        <div className="managementDetailCardBoxTop">
                                            <img src={oneOurTeam.image} alt="" />
                                            <div className="managementAbout">
                                                <p>
                                                    {oneOurTeam?.title}
                                                </p>
                                                <span>
                                                    {oneOurTeam?.content}
                                                </span>
                                            </div>
                                        </div>

                                        <button className="managementGoBackBtn btn btn-dark">
                                            <Link to={'/admin/ourTeam'}>
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

export default OurTeamDetail

