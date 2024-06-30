import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import { searchBlog, sortBlogs } from '../../../redux/slices/blogSlice';
import BlogTableItem from '../../../components/Admin/BlogItem/Index';
import { useDataContext } from '../../../context/context';
const BlogsTable = () => {
    const { theme } = useDataContext()

    const dispatch = useDispatch()
    const { blogs, blogsLoading } = useSelector(state => state.blogs)
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = blogs?.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <main className={`managementAdmin  ${theme ? "" : "tableLight"}`}>
            <Helmet>
                <title>Blogs</title>
            </Helmet>
            <div className="managementAdminInside">

                <div className='container'>
                    <div className="row">
                        <div className="col-lg-12 managementTableTop">
                            <div className="managementTableTopInside">
                                <div className="managementTableTopInsideBox">
                                    <div className="managementTableTopBoxFilter">
                                        <div className="managementTableTopFilterLeft">
                                            <input type="text" placeholder='Search Blogs' onChange={(e) => {
                                                dispatch(searchBlog(e.target.value))
                                            }} />
                                        </div>
                                        <div className="managementTableTopFilterRight">
                                            <select onChange={(e) => {
                                                dispatch(sortBlogs(e.target.value))
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
                            blogsLoading == true ? <p className='spinnerManagement'>
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
                                                        <th>Tags</th>
                                                        <th>Detail</th>
                                                        <th>Update</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentItems?.map((item, index) => {
                                                            return <BlogTableItem key={index} index={indexOfFirstItem + index} item={item} />
                                                        })
                                                    }
                                                </tbody>
                                            </table>


                                        </div>
                                        <div className="managementPagination" style={{ display: blogs.length > 7 ? "" : "none" }}>
                                            <Pagination
                                                count={Math.ceil(blogs.length / itemsPerPage)}
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

export default BlogsTable
