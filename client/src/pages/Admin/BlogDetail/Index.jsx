import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PacmanLoader from "react-spinners/PacmanLoader";
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { getOneBlog } from '../../../redux/slices/blogSlice';
import { useDataContext } from '../../../context/context';


const BlogAdminDetail = () => {
    const { theme } = useDataContext()
    const dispatch = useDispatch()
    const { oneBlog, blogsLoading } = useSelector(state => state.blogs)
    const { id } = useParams()
    useEffect(() => {
        dispatch(getOneBlog(id))
    }, [id])
    return (
        <main className={`managementDetail ${theme ? "" : "lightDetailAdmin1"}`}>
            <Helmet>
                <title>Blog Detail</title>
            </Helmet>
            <div className="managementDetailInside">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="managementDetailInsideCard">
                                {
                                    blogsLoading == true ? <p className='managementDetailSpinner'>
                                        <PacmanLoader color="#6c7293 " /></p> : <div className="managementDetailInsideCardBox">
                                        <div className="managementDetailCardBoxTop">
                                            <img src={oneBlog?.image} alt="" />
                                            <div className="managementAbout">
                                                <p>
                                                    {oneBlog?.title}
                                                </p>
                                                <span>
                                                    Posted: {oneBlog?.posterTitle}
                                                </span>

                                                <div>
                                                    <span> Tag: {oneBlog?.tags}</span>
                                                </div>
                                                <div>
                                                    <span>{oneBlog?.content}  </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='productDetailBottom'>

                                            {oneBlog?.description?.map((i, e) => {
                                                return <p key={e}>
                                                    {i}
                                                </p>

                                            })}
                                        </div>
                                        <button className="managementGoBackBtn btn btn-dark">
                                            <Link to={'/admin/blogs'}>
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

export default BlogAdminDetail

