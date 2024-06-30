import React from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  decreaseBasketItem,
  deleteFromBasket,
} from "../../../redux/slices/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function Basket() {
  const { userToken } = useSelector((state) => state.users);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let basketTotalPrice = 0;
  return (
    <>
      <Helmet>
        <title>{t("basket")}</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="header_image_basket">
        <div className="overlay_shop">{t("basket")} </div>
      </div>
      <div className="basket_section">
        <div className="basket_container">
          <div className="basket_left_image">
            <div>
              {/* <img
                src="https://dt-faryita.myshopify.com/cdn/shop/files/detail_bg1.png?v=1654586954"
                alt=""
              /> */}
            </div>
          </div>
          <div className="basket_data_container">
            {userToken?.basket?.map((item, index) => {
              basketTotalPrice += item.totalPrice;

              return (
                <div key={index} className="basket_box">
                  <div className="basket_data_image">
                    <img src={item?.product?.images} alt="" />
                  </div>
                  <div className="basket_box_text">
                    <h5>{item?.product?.title}</h5>
                    <p>
                      {t("price")} :${item?.product?.price}
                    </p>
                    <h4>
                      {t("total")}: ${item?.totalPrice}
                    </h4>
                  </div>
                  <div className="basket_box_btns">
                    <div className="basket_box_left_btns">
                      <div>
                        <button
                          className="button_basket_dec"
                          disabled={item.count == 1}
                          onClick={() => {
                            dispatch(
                              decreaseBasketItem({
                                id: item.product._id,
                                newData: item,
                              })
                            );
                            toast.success("Item decreased");
                          }}
                        >
                          -
                        </button>
                        <button className="button_basket_count">
                          {item?.count}
                        </button>
                        <button
                          className="button_basket_inc"
                          onClick={() => {
                            dispatch(
                              addToBasket({
                                id: item.product._id,
                                newData: item,
                              })
                            );
                            toast.success("Item increased");
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="basket_box_right_icon">
                      {/* <div>
                      <i
                        className="fa-regular fa-heart"
                        style={{ color: "#ff0000" }}
                      ></i>
                    </div> */}
                      <div>
                        <i
                          className="fa-solid fa-xmark"
                          style={{ color: "white" ,cursor:"pointer"}}
                          onClick={() => {
                            dispatch(
                              deleteFromBasket({
                                id: item.product._id,
                                newData: item,
                              })
                            );
                            toast.success("Item deleted successfully");
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="basket_right_box"></div>
        </div>
        <div
          className="basket_footer_section"
          style={{ display: userToken?.basket?.length > 0 ? " " : "none" }}
        >
          <div className="total">
            {t("total")}: ${basketTotalPrice}
          </div>
          <button onClick={() => navigate("/checkout")}>{t("pay")} </button>
        </div>
      </div>
    </>
  );
}

export default Basket;
