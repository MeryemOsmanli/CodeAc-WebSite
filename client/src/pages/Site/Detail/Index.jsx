import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getOneProducts } from "../../../redux/slices/productSlice";

function Detail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { oneProduct } = useSelector(state => state.products)
  useEffect(() => {
    dispatch(getOneProducts(id))
  }, [id])
  return (
    <>
          {/* detail header section start */}
      <div className="header_image_detail">
        <div className="overlay_shop">
          <img
            src="https://static.wixstatic.com/media/baac51_ec98ba3fb62b4140be49e8c2fde05a73.png/v1/fill/w_1781,h_1246,al_c,q_95,usm_0.66_1.00_0.01,enc_auto/baac51_ec98ba3fb62b4140be49e8c2fde05a73.png"
            alt=""
          />
        </div>
      </div>
      {/* detail header section end */} 
           {/* detail card section start */}

           <div className="detail_background">
        <div className="detail_contain">
          {/* <div className="detail_box">
            <div className="detail_image">
              <img
                src="https://dt-faryita.myshopify.com/cdn/shop/files/imgicon01_db5e7103-ab82-4bdb-a1b5-dc77c036d589_200x200.png?v=165511063"
                alt=""
              />
            </div>
            <div className="detail_text">
              <h3>Orange Juice</h3>
              <div>
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
              </div>
              <h4>
                Price: <span>10$</span>
              </h4>
              <h5>
                Flavour: <span>Orange</span>
              </h5>
            </div>
          </div> */}
          <div className="detail_box">
            <div className="detail_image">
              <img
                src={oneProduct?.images}
                // src='https://dt-faryita.myshopify.com/cdn/shop/products/shop04_bb828580-bf5f-4834-a6c6-786f8a36f7e5_2000x.png?v=1658467145'
                alt=""
              />
            </div>
            <div className="detail_text">
              <h3>{oneProduct?.title}</h3>
              {/* <h3>orange juice</h3> */}
              {/* <div>
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
              </div> */}
              <h4>
                Price: <span>${oneProduct?.price}</span>
                {/* Price: <span>$10</span> */}
              </h4>
              <h5>
                Flavour: <span>{oneProduct?.flavour}</span>
                {/* Flavour: <span>Strawberry</span> */}
              </h5>
              <div>
                <p>
                  {oneProduct?.description}
                  {/* Strawberry juice is a delightful and refreshing beverage made from fresh, ripe strawberries. It boasts a natural sweetness and vibrant red color, making it as visually appealing as it is tasty. Rich in vitamin C, manganese, and antioxidants, strawberry juice offers numerous health benefits, including immune system support and anti-inflammatory properties. The antioxidants in strawberries help protect the body against free radicals, potentially reducing the risk of chronic diseases. Additionally, the juice is hydrating and can be a great alternative to sugary sodas and artificial drinks. Its natural sweetness means it can be enjoyed on its own or as a base for smoothies and other mixed beverages. Strawberry juice is also low in calories, making it a suitable choice for those looking to maintain a healthy diet. The preparation is simple, requiring only fresh strawberries, a bit of water, and optional sweeteners like honey or agave syrup. Whether enjoyed at breakfast, as a mid-day refreshment, or a post-workout drink, strawberry juice is a versatile and nutritious option for all ages. */}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="detail_box">
            <div className="detail_image">
              <img
                src="https://402creamery.com/cdn/shop/files/Katy-Berry-Cutout_5c663476-7b12-4898-b074-75f5d262b1e5.png?v=1711982097&width=1420"
                alt=""
              />
            </div>
            <div className="detail_text">
              <h3>Orange Juice</h3>
              <div>
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
              </div>
              <h4>
                Price: <span>10$</span>
              </h4>
              <h5>
                Flavour: <span>Orange</span>
              </h5>
              <div>
                <p>
                  Orange juice is rich in vitamin C and other antioxidants,
                  which boost the immune system and protect the body against the
                  harmful effects of free radicals. It is also rich in
                  potassium, folate, and other essential nutrients.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* detail card section end */}
    </>
  )
}

export default Detail