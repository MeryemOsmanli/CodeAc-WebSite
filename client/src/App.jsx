
// import { RouterProvider } from 'react-router-dom'
// import { DataContextProvider } from './context/context'
import './css/main.css'
import Footer from './layout/Site/Footer/Index'
import UserNavbar from './layout/Site/Header/Index'
import Basket from './pages/Site/Basket/Index'
import Blog from './pages/Site/Blog/Index'
import BlogDetail from './pages/Site/BlogDetail/Index'
import Contact from './pages/Site/Contact/Index'
import Detail from './pages/Site/Detail/Index'
import Faq from './pages/Site/Faq/Index'
import Home from './pages/Site/Home/Index'
import Login from './pages/Site/Login/Index'
import OrderSuccess from './pages/Site/OrderSuccess/Index'
import Register from './pages/Site/Register/Index'
import Shop from './pages/Site/Shop/Index'
import Wishlist from './pages/Site/Wishlist/Index'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import ROUTER from "./router/index.router";
import "bootstrap/dist/css/bootstrap.min.css";
import { HelmetProvider } from "react-helmet-async";
// import "./css/main.css";
import { DataContextProvider } from "./context/context";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import ROUTER from './router/index.router'

function App() {
  const routes = createBrowserRouter(ROUTER);

  return (
    <>
    {/* <UserNavbar/> */}
     {/* <Home/> */}
     {/* <Contact/> */}
     {/* <Login/> */}
     {/* <Register/> */}
     {/* <Shop/> */}
     {/* <Detail/> */}
     {/* <Faq/> */}
     {/* <Blog/> */}
     {/* <BlogDetail/> */}
     {/* <Basket/> */}
     {/* <OrderSuccess/> */}
     {/* <Wishlist/> */}
     {/* <Footer/> */}
     <DataContextProvider>
        <HelmetProvider>
          <RouterProvider router={routes} />

          <Toaster />
        </HelmetProvider>
      </DataContextProvider>
    </>
  )
}

export default App
