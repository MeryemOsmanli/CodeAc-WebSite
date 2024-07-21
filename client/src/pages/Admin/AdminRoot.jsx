import React, { useEffect } from 'react'
import Sidebar from '../../layout/Admin/Sidebar/Index'
import Header from '../../layout/Admin/Header/Index'
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllQuestions } from '../../redux/slices/faqSlice';
import { getAllOrders } from '../../redux/slices/orderSlice';
import { getAllOurTeam } from '../../redux/slices/ourTeamSlice';
import { getAllSubscribers } from '../../redux/slices/subscribersSlice';
import { getAllUsers, getUserToken } from '../../redux/slices/userSlice';
import { getAllProducts } from '../../redux/slices/productSlice';
import { getAllBlog } from '../../redux/slices/blogSlice';

const AdminRoot = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllQuestions())
        dispatch(getAllOrders())
        dispatch(getAllOurTeam())
        dispatch(getAllSubscribers())
        dispatch(getAllUsers())
        dispatch(getAllProducts())
        dispatch(getAllBlog())

    }, [])
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            dispatch(getUserToken())

        }
    }, [])
    return (
        <div style={{ position: 'relative', overflow: "hidden", display: 'flex' }}>

            <Sidebar />
            <Header />
            <Outlet />
        </div>
    )
}

export default AdminRoot
