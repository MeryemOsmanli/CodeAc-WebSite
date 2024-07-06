import React from "react";
import { Badge } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { postOrder } from "../../../redux/slices/orderSlice";
import { clearBasket } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
function Checkout() {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userToken } = useSelector((state) => state.users);
  let basketTotalPrice = 0;
  let basketTotalAmount = userToken?.basket?.length;
  const formik = useFormik({
    initialValues: {
      orderedUserId: null,
      orderFirstName: "",
      orderLastName: "",
      orderAddress: "",
      orderApartments: "",
      orderCity: "",
      orderCountry: "",
      orderTotalPrice: 0,
      orderTotalAmount: 0,
      orderGmail: "",
      orderStatus: "Pending",
      items: [],
    },
    validationSchema: Yup.object({
      orderFirstName: Yup.string().required("First name is required"),
      orderLastName: Yup.string().required("Last name is required"),
      orderAddress: Yup.string().required("Address is required"),
      orderApartments: Yup.string().required("Apartments is required"),
      orderCity: Yup.string().required("City is required"),
      orderCountry: Yup.string().required("Country is required"),
      orderGmail: Yup.string()
        .email("Invalid email format")
        .required("Gmail is required"),
      orderStatus: Yup.string()
        .oneOf(["Pending", "Accept", "Reject"])
        .default("Pending"),
      items: Yup.array().of(Yup.string()),
    }),

    onSubmit: async (values) => {
      if (userToken.isLogin == true) {
        const basketItems = userToken?.basket.map((item) => item);
        const postedProduct = {
          orderedUserId: userToken?.id,
          orderFirstName: values.orderFirstName,
          orderLastName: values.orderLastName,
          orderAddress: values.orderAddress,
          orderApartments: values.orderApartments,
          orderCity: values.orderCity,
          orderCountry: values.orderCountry,
          orderGmail: values.orderGmail,
          orderStatus: values.orderStatus,
          items: basketItems,
          orderTotalPrice: basketTotalPrice,
          orderTotalAmount: basketTotalAmount,
        };
        dispatch(postOrder(postedProduct));
        dispatch(clearBasket({ id: userToken?.id }));
        setTimeout(() => {
          navigate("/orderSuccess");
          window.scrollTo({ top: 0 });
        }, 50);
        formik.resetForm();
      } else {
        toast.error(
          "Oops! It seems like you're not logged in. Please log in to access your basket."
        );
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="checkout_background">
          <div className="checkout_contain">
            <div className="checkout_left_section">
              <div className="checkout_email_box">
                <h4>{t("contact")} </h4>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    placeholder="Email "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="orderGmail"
                    value={formik.values.orderGmail}
                  />
                  {formik.touched.orderGmail && formik.errors.orderGmail ? (
                    <small style={{ color: "red" }} className="registerError">
                      {formik.errors.orderGmail}
                    </small>
                  ) : null}
                </div>
              </div>
              <div className="checkout_delivery_box">
                <h4>{t("delivery")} </h4>
                <div>
                  <input
                    type="text"
                    placeholder="Country "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="orderCountry"
                    value={formik.values.orderCountry}
                  />
                  {formik.touched.orderCountry && formik.errors.orderCountry ? (
                    <small style={{ color: "red" }} className="registerError">
                      {formik.errors.orderCountry}
                    </small>
                  ) : null}

                  <input
                    type="text"
                    placeholder="City "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="orderCity"
                    value={formik.values.orderCity}
                  />
                  {formik.touched.orderCity && formik.errors.orderCity ? (
                    <small style={{ color: "red" }} className="registerError">
                      {formik.errors.orderCity}
                    </small>
                  ) : null}
                  <div className="checkout_name_box ">
                    <div
                      className="leftFnameInp d-flex flex-column"
                      style={{ width: "48%" }}
                    >
                      <input
                        type="text"
                        className="w-100"
                        id="name"
                        placeholder="First name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="orderFirstName"
                        value={formik.values.orderFirstName}
                      />
                      {formik.touched.orderFirstName &&
                      formik.errors.orderFirstName ? (
                        <small
                          style={{ color: "red" }}
                          className="registerError"
                        >
                          {formik.errors.orderFirstName}
                        </small>
                      ) : null}
                    </div>
                    <div
                      className="rightLnameInp d-flex flex-column"
                      style={{ width: "48%" }}
                    >
                      <input
                        type="text"
                        className="w-100"
                        id="lastname"
                        placeholder="Last name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="orderLastName"
                        value={formik.values.orderLastName}
                      />
                      {formik.touched.orderLastName &&
                      formik.errors.orderLastName ? (
                        <small
                          style={{ color: "red" }}
                          className="registerError"
                        >
                          {formik.errors.orderLastName}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="orderAddress"
                    value={formik.values.orderAddress}
                  />
                  {formik.touched.orderAddress && formik.errors.orderAddress ? (
                    <small style={{ color: "red" }} className="registerError">
                      {formik.errors.orderAddress}
                    </small>
                  ) : null}
                  <input
                    type="text"
                    placeholder="Apartment, suite,etc."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="orderApartments"
                    value={formik.values.orderApartments}
                  />
                  {formik.touched.orderApartments &&
                  formik.errors.orderApartments ? (
                    <small style={{ color: "red" }} className="registerError">
                      {formik.errors.orderApartments}
                    </small>
                  ) : null}
                </div>
              </div>
              <div className="checkout_pay_btn">
                <button type="submit">{t("paynow")} </button>
              </div>
            </div>
            <div className="checkout_right_section mt-5">
              {userToken?.basket?.length == 0 ? (
                <p
                  style={{
                    marginTop: "100px",
                    fontSize: "20px",
                    textAlign: "center",
                    fontStyle: "italic",
                  }}
                >
                  Your Basket Is Empty
                </p>
              ) : (
                userToken?.basket?.map((item, index) => {
                  basketTotalPrice += item.totalPrice;
                  return (
                    <div key={index} className="checkout_product_box">
                      <div className="checkout_product_img">
                        <img src={item.product.images} alt="" />
                      </div>
                      <div className="checkout_product_text">
                        <div className="product_name_subtotal">
                          <h5>{item.product.title}</h5>
                          <p>
                            {t("count")}: {item.count}
                          </p>
                        </div>
                        <div className="product_price-count">
                          <p>${item.product.price}</p>
                          <p>
                            {t("subTotal")}: <span>${item.totalPrice}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              <h4>
                {t("total")}: ${basketTotalPrice}
              </h4>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
