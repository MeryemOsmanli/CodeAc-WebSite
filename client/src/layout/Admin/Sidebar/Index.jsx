import React, { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { mdiAccountBadge, mdiAccountGroup, mdiAccountMultiple, mdiAccountMultipleOutline, mdiCalendarToday, mdiChatQuestion, mdiCheckAll, mdiComment, mdiDatabaseCog, mdiDotsVertical, mdiFileStar, mdiFrequentlyAskedQuestions, mdiGoogleStreetView, mdiHelpRhombusOutline, mdiHomeAccount, mdiInvoiceList, mdiMessageDraw, mdiPodium, mdiPodiumGold, mdiPost, mdiPostOutline, mdiShopping, mdiSpeedometer, mdiStore } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiCog } from '@mdi/js';
import { mdiInformationOutline } from '@mdi/js';
import { useDispatch, useSelector } from 'react-redux'
import { useDataContext } from '../../../context/context';


const Sidebar = () => {
    const { sideBardHeadRef, theme } = useDataContext()
    const { userToken } = useSelector(state => state.users)

    const location = useLocation()
    const dispatch = useDispatch()
    return (
        <div className={`sidebar ${theme ? '' : "sideBarLightMode"}  `} style={{ display: location.pathname == '/admin/loginAdmin' || location.pathname == '/admin/adminRegister' ? 'none' : '' }} ref={sideBardHeadRef}>
            <div className="sidebarTop  d-none d-lg-flex align-items-center justify-content-center fixed-top">
                <Link to={'/admin'} style={{ color: "white" }} className='sidebarTopLink1'>
                   MaRainbow
                </Link>
                <Link to={'/admin'} style={{ color: "white" }} className='sidebarTopLink2'>
                    MR
                </Link>
            </div>
            <ul className="sidebarBottom">
                <li className='profileImage sidebarBottomLinks'>
                    <div className="profileImageInside">
                        <div className="profileImageInsideLeft">
                            <div className="profileImageInsideLeftImg">
                                <img src={`${userToken?.isAdmin == true ? userToken?.profileImage : 'https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg'
                                    }`} alt="exImage" />
                                <span
                                    style={{ background: userToken?.isAdmin == false ? 'red' : '' }} className={`${userToken?.isAdmin == true && userToken?.isLogin == true ? 'activeGreen' : ''
                                        }`}
                                >

                                </span>
                            </div>
                            <div className="profileImageInsideLeftAbout">
                                <h5>
                                    {userToken?.isAdmin == true ? userToken?.fullName : 'Admin'}
                                </h5>
                                <span>Gold Member</span>
                            </div>
                        </div>
                        <div className="profileImageInsideRight" >
                            <Icon path={mdiDotsVertical} size={1} />

                        </div>

                    </div>
                </li>
                <li className="sidebarBottomLinks navCategory">
                    <span>Navigation</span>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/' ? "navMenuActive" : ""}`} >
                    <Link to={'/'}>
                        <div className="navMenuIcon text-info">
                            <span>
                                <Icon path={mdiHomeAccount} size={0.8} />

                            </span>
                        </div>
                        <span className="navMenuText">
                            Site
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin'}>
                        <div className="navMenuIcon speedometer">
                            <span>

                                <Icon path={mdiSpeedometer} size={0.8} />
                            </span>
                        </div>
                        <span className="navMenuText">
                            Dashboard
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/users' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/users'}>
                        <div className="navMenuIcon text-warning">
                            <span>
                                <Icon path={mdiAccountMultipleOutline} size={0.8} />


                            </span>
                        </div>
                        <span className="navMenuText">
                            Users
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/products' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/products'}>
                        <div className="navMenuIcon text-primary">
                            <span>
                                <Icon path={mdiStore} size={0.8} />


                            </span>
                        </div>
                        <span className="navMenuText">
                            Products
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/orders' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/orders'}>
                        <div className="navMenuIcon text-danger">
                            <span>
                                <Icon path={mdiCheckAll} size={0.8} />


                            </span>
                        </div>
                        <span className="navMenuText">
                            Orders
                        </span>
                    </Link>
                </li>

                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/blogs' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/blogs'}>
                        <div className="navMenuIcon text-warning">
                            <span>
                                <Icon path={mdiPost} size={0.8} />

                            </span>
                        </div>
                        <span className="navMenuText">
                            Blogs
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/faq' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/faq'}>
                        <div className="navMenuIcon text-light">
                            <span>
                                <Icon path={mdiChatQuestion} size={0.8} />


                            </span>
                        </div>
                        <span className="navMenuText">
                            Faq
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/subscribers' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/subscribers'}>
                        <div className="navMenuIcon text-info">
                            <span>
                                <Icon path={mdiAccountBadge} size={0.8} />


                            </span>
                        </div>
                        <span className="navMenuText">
                            Subscribers
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/addProduct' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/addProduct'}>
                        <div className="navMenuIcon speedometer">
                            <span>
                                <Icon path={mdiShopping} size={0.8} />


                            </span>
                        </div>
                        <span className="navMenuText">
                            Add Product
                        </span>
                    </Link>
                </li>


                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/addBlog' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/addBlog'}>
                        <div className="navMenuIcon text-info">
                            <span>
                                <Icon path={mdiPostOutline} size={0.8} />

                            </span>
                        </div>
                        <span className="navMenuText">
                            Add Blog
                        </span>
                    </Link>
                </li>


                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/addFaq' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/addFaq'}>
                        <div className="navMenuIcon text-primary">
                            <span>
                                <Icon path={mdiFrequentlyAskedQuestions} size={0.8} />


                            </span>
                        </div>
                        <span className="navMenuText">
                            Add Faq
                        </span>
                    </Link>
                </li>


            </ul>
        </div>
    )
}

export default Sidebar
