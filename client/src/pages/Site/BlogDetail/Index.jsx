import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOneBlog } from "../../../redux/slices/blogSlice";
import moment from "moment";
import { Helmet } from 'react-helmet';

function BlogDetail() {
  const { oneBlog } = useSelector((state) => state.blogs);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneBlog(id));
  }, [id]);
  return (
    <>
    <Helmet>
        <title>blogdetail</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
           <div className="blog_detail_background">
        <div className="blog_detail_contain">
          <div className="blog_detail_header">
            <img
              src="https:dt-faryita.myshopify.com/cdn/shop/files/breadcrumb_bc57e145-dc2e-410c-9c11-4c22d1a357eb.png?v=165518728"
              alt=""
            />
            <div className="overlay_blog_detail">
              {/* burada click edilen mehsula gore adlari gelmelidir  */}
              <h1>Fresh Juice</h1>
            </div>
          </div>

          <div className="blog_detail_image">
            <div className="blog_image_box">
              {/* detail image  */}
              <img src={oneBlog?.image} alt="" />
            </div>
          </div>
          <div className="blog_detail_text_box container">
            <div>
              <h5>{oneBlog?.title}</h5> {/* blog name  */}
              <i className="fa-solid fa-calendar-days"></i>{" "}
              <span>{moment(oneBlog?.createdAt).format("MMMM Do YYYY")}</span>{" "}
              {/* blog created date  */}
              <span style={{ display: "block" }}>{oneBlog?.content}</span>
              {oneBlog?.description?.map((i, e) => {
                return <p key={e}>{i} </p>;
              })}
              <i className="fa-solid fa-tag"></i>{" "}
              <a href="http://localhost:5173/blogs">{oneBlog?.tags}</a>{" "}
              {/* blogs page  */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogDetail