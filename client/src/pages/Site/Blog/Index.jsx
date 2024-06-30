import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useSelector((state) => state.blogs);

  return <>
    
    <div className="blog_background">
        <div className="blog_contain">
          {/* <div className="blog_header">
            <img
              src="https:dt-faryita.myshopify.com/cdn/shop/files/breadcrumb_bc57e145-dc2e-410c-9c11-4c22d1a357eb.png?v=165518728"
              alt=""
            />
            <div className="overlay_blog">
              <h1>blogs</h1>
            </div>
          </div> */}
                   {/* faq header section start */}
         <div className="header_image_faq">
        <div className="overlay_shop">
          <div className="shoph1">Blog</div>
          <img src="https://faryita.wpengine.com/wp-content/uploads/2024/03/Breadcrumb-main-1.png" alt="" />
          
           </div>
      </div>
    <div className="svg">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffc935" fill-opacity="1" d="M0,160L48,138.7C96,117,192,75,288,80C384,85,480,139,576,181.3C672,224,768,256,864,240C960,224,1056,160,1152,144C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
    </div>
      {/* faq header section end */}
          <div className="blog_card_background container">
            <div className="blog_box_contain">
              {blogs?.map((i, e) => {
                 return ( 
<div key={e} className="blog_box">
                    <div className="blog_box_image">
                      <img src={i.image} alt="" />
                    </div>
                    <div className="blog_name_box">
                      {/* <h6>2 comments ,</h6> */}
                      <h5>{i.tags}</h5>
                      <Link to={`/blogsDetail/${i._id}`}>
                        <h2>{i.title}</h2>
                      </Link>
                      <p>{i.content}</p>
                      <span>{i.posterTitle}</span>
                      <span> - </span>
                      <span>{moment(i?.createdAt).format("MMMM Do YYYY")}</span>
                    </div>
                  </div>

                  
                 )
               })} 
            </div>
                  {/* <div className="blog_box">
                    <div className="blog_box_image">
                      <img src={i.image} alt="" />
                      <img src="https://faryita.wpengine.com/wp-content/uploads/2024/04/Blog-Image-12.jpg" alt="" />
                    </div>
                    <div className="blog_name_box">
                      <h6>2 comments ,</h6>
                      <h5>Fresh Juice</h5>
                      <h2>Vitamins with Great Taste in Pineapple</h2>
                      <p>Vitamins with Great Taste in Pineapple provides a flavorful and enjoyable way to get essential nutrients. Packed with the tropical goodness of pineapple, it makes taking your vitamins a delightful experience. Simply sip on this tasty beverage to nourish your body and boost your overall health.</p>
                      <span>By Admin</span>
                      <span> - </span>
                      <span>24.06.2024</span>
                    </div>
                  </div> */}

          </div>
        </div>
      </div>
  </>;
}

export default Blogs;
