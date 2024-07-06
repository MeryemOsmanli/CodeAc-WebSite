import React, { useEffect } from "react";
import Header from "../../layout/Site/Header/Index";
import { Outlet } from "react-router-dom";
import Footer from "../../layout/Site/Footer/Index";
import { useDispatch } from "react-redux";
import { getAllQuestions } from "../../redux/slices/faqSlice";
import { getAllOrders } from "../../redux/slices/orderSlice";
import { getAllSubscribers } from "../../redux/slices/subscribersSlice";
import { getAllUsers, getUserToken } from "../../redux/slices/userSlice";
import { getAllProducts } from "../../redux/slices/productSlice";
import { getAllBlog } from "../../redux/slices/blogSlice";

const SiteRoot = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllQuestions())
    dispatch(getAllOrders())
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
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default SiteRoot;
