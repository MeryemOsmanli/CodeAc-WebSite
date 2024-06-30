import React from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromWishlist,
} from "../../../redux/slices/userSlice";
import { useTranslation } from "react-i18next";

function WishList() {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.users);
  console.log(userToken);
  return (
    <>
      <Helmet>
        <title>{t("favourite")} </title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="header_image_wishList">
        <div className="overlay_shop">{t("favourite")} </div>
      </div>
      <div className="wishList_section">
        <div className="wishList_container">
          <div className="wishList_left_image">
            <div>
              {/* <img
                src="https://dt-faryita.myshopify.com/cdn/shop/files/detail_bg1.png?v=1654586954"
                alt=""
              /> */}
            </div>
          </div>
          <div className="wishList_data_container">
            {userToken?.wishlist?.map((item, index) => {
              return (
                <div key={index} className="wishList_box">
                  <div className="wishList_data_image">
                    <img src={item.images} alt="" />
                  </div>
                  <div className="wishList_box_text">
                    <h5>{item.title}</h5>
                    <p>
                      {t("price")} :${item.price}
                    </p>
                    {/* <h4>Total: $10</h4> */}
                    <button
                      onClick={async () => {
                        const token = localStorage.getItem("token");
                        if (userToken && token) {
                          const basket = {
                            id: item._id,
                            product: item,
                            count: 1,
                            totalPrice: item.price,
                          };
                          dispatch(
                            addToBasket({ id: item._id, newData: basket })
                          );
                          toast.success("Product added to the basket");
                        } else {
                          toast.error(
                            "Oops! It seems like you're not logged in. Please log in to access your basket."
                          );
                        }
                      }}
                    >
                      {t("addbasket")}
                    </button>
                  </div>
                  <div className="wishList_box_btns">
                    <div className="wishList_box_right_icon">
                      <div>
                        <i
                          className="fa-solid fa-xmark"
                          style={{ color: "white", cursor: "pointer" }}
                          onClick={async () => {
                            const filterWishlist = userToken?.wishlist?.find(
                              (prod) => prod._id == item?._id
                            );

                            if (!filterWishlist) {
                              toast.error(
                                "You Don't Have This Item In Your Wishlist"
                              );
                            } else {
                              await dispatch(
                                removeFromWishlist({ id: filterWishlist?._id })
                              );
                              toast.success(
                                "Product Deleted From Your Wishlist"
                              );
                            }
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="wishList_right_box"></div>
        </div>
      </div>
    </>
  );
}

export default WishList;
