import AddBlog from "../pages/Admin/AddBlog/Index";
import AddFaq from "../pages/Admin/AddFaq/Index";
import AddProduct from "../pages/Admin/AddProduct/Index";
import AdminRoot from "../pages/Admin/AdminRoot";
import AddOurTeam from "../pages/Admin/AddOurTeam/Index";
import BlogAdminDetail from "../pages/Admin/BlogDetail/Index";
import BlogsTable from "../pages/Admin/Blogs/Index";
import Dashboard from "../pages/Admin/Dashboard/Index";
import EditFaq from "../pages/Admin/EditFaq/Index";
import EditOurTeam from "../pages/Admin/EditOurTeam/Index";
import UpdateProduct from "../pages/Admin/EditProduct/Index";
import FaqAdmin from "../pages/Admin/Faq/Index";
import FaqDetail from "../pages/Admin/FaqDetail/Index";
import OrderDetail from "../pages/Admin/OrderDetail/Index";
import Orders from "../pages/Admin/Orders/Index";
import ProductDetail from "../pages/Admin/ProductDetail/Index";
import OurTeamDetail from "../pages/Admin/OurTeamDetail/Index";
import OurTeam from "../pages/Admin/OurTeamTable/Index";

import ProductsTable from "../pages/Admin/Products/Index";
import Subscribers from "../pages/Admin/Subscribers/Index";
import UpdateBlog from "../pages/Admin/UpdateBlog/Index";
import Users from "../pages/Admin/Users/Index";
import Basket from "../pages/Site/Basket/Index";
import Blogs from "../pages/Site/Blog/Index";
import BlogDetail from "../pages/Site/BlogDetail/Index";
import Checkout from "../pages/Site/Checkout/Index";
import Contact from "../pages/Site/Contact/Index";
import Detail from "../pages/Site/Detail/Index";
import Faq from "../pages/Site/Faq/Index";
import Home from "../pages/Site/Home/Index";
import Team from "../pages/Site/Team/Index";
import Login from "../pages/Site/Login/Index";
import OrderSuccess from "../pages/Site/OrderSuccess/Index";
import Register from "../pages/Site/Register/Index";
import Shop from "../pages/Site/Shop/Index";
import SiteRoot from "../pages/Site/SiteRoot";
import Wishlist from "../pages/Site/Wishlist/Index";

const ROUTER =[
    {
        path: "/",
        element: <SiteRoot />,
        children: [
          {
            path: "",
            element: <Home />
          },
          {
            path: "contact",
            element: <Contact />
          },
          {
            path: "team",
            element: <Team />
          },
          {
            path: "shop",
            element: <Shop />
          },
          {
            path: "login",
            element: <Login />
          },
          {
            path: "register",
            element: <Register />
          },
          {
            path: "basket",
            element: <Basket />
          },
          {
            path: "faq",
            element: <Faq />
          },
          {
            path: "wishlist",
            element: <Wishlist />
          },
          {
            path: "/:id",
            element: <Detail />
          },
          {
            path: "checkout",
            element: <Checkout />
          },
          {
            path: "orderSuccess",
            element: <OrderSuccess />
          },
          {
            path: "blogs",
            element: <Blogs />
          },
          {
            path: "blogsDetail/:id",
            element: <BlogDetail />
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminRoot />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "addOurTeam",
            element: <AddOurTeam />,
          },
          {
            path: "ourTeam",
            element: <OurTeam />,
          },
          {
            path: "ourTeam/:id",
            element: <OurTeamDetail />,
          },
          {
            path: "ourTeam/edit/:id",
            element: <EditOurTeam />,
          },
          {
            path: "addFaq",
            element: <AddFaq />,
          },
          {
            path: "faq",
            element: <FaqAdmin />,
          },
          {
            path: "faq/:id",
            element: <FaqDetail />,
          },
          {
            path: "faq/edit/:id",
            element: <EditFaq />,
          },
    
          {
            path: "subscribers",
            element: <Subscribers />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "addProduct",
            element: <AddProduct />,
          },
          {
            path: "products",
            element: <ProductsTable />,
          },
          {
            path: "products/:id",
            element: <ProductDetail />,
          },
          {
            path: "products/edit/:id",
            element: <UpdateProduct />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "orders/:id",
            element: <OrderDetail />,
          },
          {
            path: "addBlog",
            element: <AddBlog />,
          },
          {
            path: "blogs",
            element: <BlogsTable />,
          },
          {
            path: "blogs/:id",
            element: <BlogAdminDetail />,
          },
          {
            path: "blogs/edit/:id",
            element: <UpdateBlog />,
          },
        ],
      },
]
export default ROUTER;