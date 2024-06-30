import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const { products } = useSelector((state) => state.products);
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("thanks")} </title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="success_background">
        <div className="success_contain">
          <div className="success_check_icon">
            <i className="fa-solid fa-check"></i>
          </div>
          <div>
            <h3>{t("thankschoosing")}</h3>
          </div>
          <div className="succes_footer_image">
            <div className="overlay_success">
              <h3>{t("recommended")}</h3>
              <a href="#recommended">
                {" "}
                <i className="fa-solid fa-angles-down"></i>
              </a>
            </div>
            {/* <img src="https://images6.alphacoders.com/916/916834.jpg" alt="" /> */}
          </div>
          <div className="success_recomendded_product" id="recommended">
            {products?.slice(0, 4).map((item, i) => {
              return (
                <div key={i} className="succes_product_box">
                  <div className="success_product_box_image">
                    <img src={item.images} alt="" />
                  </div>
                  <div className="success_product_box_empty">
                    <Link to={`/${item._id}`}>
                      <h4>{item.title}</h4>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
