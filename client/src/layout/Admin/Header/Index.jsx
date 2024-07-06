import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Icon from '@mdi/react';
import { mdiCog, mdiFormatLineSpacing, mdiLogout, mdiMenu, mdiMenuDown, mdiMoonFull, mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { useDataContext } from '../../../context/context';
import { searchQuestions } from '../../../redux/slices/faqSlice';
import { searchSubscribers } from '../../../redux/slices/subscribersSlice';
import { logOut, searchUser, updateUserIsLogin } from '../../../redux/slices/userSlice';
import { searchProducts } from '../../../redux/slices/productSlice';
import { searchOrder } from '../../../redux/slices/orderSlice';
import { searchBlog } from '../../../redux/slices/blogSlice';
const Header = () => {
    const { adminHeadRef, handleAddWidthHeader, handleResSideBar,theme, setTheme } = useDataContext()
    const userAdminDrop = useRef()
    const handleActiveDrop = () => {
        userAdminDrop.current.classList.toggle('activeUserAdminDrop')
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { userToken } = useSelector(state => state.users)

    return (
        <header header className={`adminHeader  ${theme ? "" : "lightMode"} `} style={{ display: location.pathname == '/admin/loginAdmin' || location.pathname == '/admin/adminRegister' ? 'none' : '' }} ref={adminHeadRef} >
            <div className="adminHeaderTop d-lg-none d-flex align-items-center justify-content-center">
                <Link to="/admin" className="adminHeaderTopLogo" style={{ fontSize: "18px" }}>
                    JM
                </Link>
            </div>
            <div className="adminHeaderBottom">
                <button className='adminHeadBtn1' onClick={handleAddWidthHeader}>
                    <Icon path={mdiMenu} size={0.8} />

                </button>
                <ul className="headerSearchBx">
                    <li>
                        <div className="headerSearchInputBox  mt-2 mt-md-0 d-none d-lg-flex ">
                            <input
                                disabled={location.pathname !=='/admin/products' &&
                                    location.pathname !== '/admin/faq' &&
                                    location.pathname !== '/admin/users' &&
                                    location.pathname !== '/admin/subscribers' &&
                                    location.pathname !== '/admin/orders' &&
                                    location.pathname !== '/admin/blogs' 

                                }
                                type="text" placeholder='Search '
                                onChange={(e) => {
                                    if (location.pathname == '/admin/blogs') {
                                        dispatch(searchBlog(e.target.value))
                                    } else if (location.pathname == '/admin/faq') {
                                        dispatch(searchQuestions(e.target.value))

                                    } else if (location.pathname == '/admin/subscribers') {
                                        dispatch(searchSubscribers(e.target.value))

                                    } else if (location.pathname == '/admin/users') {
                                        dispatch(searchUser(e.target.value))

                                    } else if (location.pathname == '/admin/products') {
                                        dispatch(searchProducts(e.target.value))

                                    } else if (location.pathname == '/admin/orders') {
                                        dispatch(searchOrder(e.target.value))

                                    } 
                                 
                                }}
                            />
                        </div>
                    </li>
                </ul>
                <ul className="adminUserDrop">
                    <li className="userLeftDrop">
                        <button className='userLeftDropBtn' onClick={handleActiveDrop}>
                            <div className="userLeftDropButtonInside">
                                <img
                                    src={`${userToken?.isAdmin == true ? userToken?.profileImage : 'https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg'
                                        }`} alt="exImage" />
                                <p className='mb-0 d-none d-sm-block '>
                                    {userToken?.isAdmin == true ? userToken?.fullName : 'Admin'}
                                </p>
                                <span className='d-none d-sm-block'>
                                    <Icon path={mdiMenuDown} size={0.7} />
                                </span>
                            </div>

                        </button>
                        <div className="userLeftDropInside" ref={userAdminDrop}>
                            <h6 className="p-3 mb-0">Profile</h6>
                            <div className="userLeftDropInsideLine"></div>

                            <button onClick={async () => {
                                dispatch(updateUserIsLogin({ id: userToken?.id, newData: { isLogin: false } }))
                                dispatch(logOut())
                                toast.success('Logout successful! See you next time.');

                                navigate('/')
                            }} className='userLeftDropInsideClick'>
                                <div className="userLeftDropInsideIcon">
                                    <div className="userLeftDropInsideI setLogOutI">
                                        <Icon path={mdiLogout} size={0.8} />

                                    </div>
                                </div>
                                <div className="userLeftDropInsideText">
                                    <p className=" m-0">Log Out</p>
                                </div>
                            </button>

                            <button onClick={() => {
                                localStorage.setItem('theme', JSON.stringify(!theme))
                                setTheme(!theme)
                            }} className='userLeftDropInsideClick'>
                                <div className="userLeftDropInsideIcon">
                                    <div className="userLeftDropInsideI text-warning">
                                        {
                                            theme != true ? <Icon path={mdiWhiteBalanceSunny} size={0.8} />
                                                : <Icon path={mdiWeatherNight} size={0.8} />
                                        }
                                    </div>
                                </div>
                                <div className="userLeftDropInsideText">
                                    <p className=" m-0">{theme ? 'Dark' : "Light"}</p>
                                </div>
                            </button>
                        </div>
                    </li>
                </ul>
                <button className="sideBarToggleMenu d-lg-none align-self-center" onClick={handleResSideBar}>
                    <Icon path={mdiFormatLineSpacing} size={0.9} />

                </button>
            </div>
        </header >
    )
}

export default Header
