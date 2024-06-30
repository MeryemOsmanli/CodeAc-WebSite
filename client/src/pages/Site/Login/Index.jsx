import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, updateUserIsLogin } from "../../../redux/slices/userSlice";
import bcrypt from "bcryptjs";
import { useTranslation } from "react-i18next";

function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const formik = useFormik({
    initialValues: {
      password: "",
      gmail: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please Enter Your Password"),
      gmail: Yup.string()
        .email("Invalid email address")
        .required("Please Enter Your Gmail"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      const user = {
        gmail: values.gmail,
        password: values.password,
      };
      const target = users.find((user) => user.gmail === values.gmail);

      if (target) {
        const match = await bcrypt.compare(values.password, target.password);
        if (target.isAdmin === true) {
          if (match) {
            await dispatch(loginUser(user));
            dispatch(
              updateUserIsLogin({
                id: target._id,
                newData: { isLogin: true },
              })
            );
            navigate("/admin");
            formik.resetForm();
          } else {
            setFieldError("password", "Incorrect Password");
          }
        } else {
          if (!match) {
            setFieldError(
              "password",
              "Incorrect Password,Please Enter Correct Password"
            );
          } else {
            await dispatch(loginUser(user));
            dispatch(
              updateUserIsLogin({
                id: target._id,
                newData: { isLogin: true },
              })
            );

            navigate("/");
            formik.resetForm();
          }
        }
      } else {
        setFieldError(
          "userGmail",
          "Email Not Found,Please Enter Correct Email"
        );
      }
    },
  });
  return (
    <>
      <Helmet>
        <title> {t("login")}</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="login_background">
        <div className="login_section ">
          <div className="login_sec_img ">
            <img
              src="https://demo.htmlcodex.com/1362/ice-cream-shop-website-template/img/header.jpg"
              alt=""
            />
            <div className="overlay_login">
              <div className="overlay_text_box">
                <h1>{t("account")} </h1>
                <span>{t("homeaccount")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="contact_form_background container">
          <div className="contact_form">
            <div className="contact_form_text">
              <i className="fa-regular fa-envelope"></i>
              <h1>{t("getintouch")}</h1>
              <p>{t("hearcontact")}</p>
            </div>
            <div className="form_content">
              <form className="input_box" onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    name="gmail"
                    value={formik.values.gmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="email"
                    placeholder="Email address"
                  />
                  {formik.touched.gmail && formik.errors.gmail ? (
                    <small style={{ color: "red" }} className="registerError">
                      {formik.errors.gmail}
                    </small>
                  ) : null}
                </div>
                <div>
                  <input
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    placeholder="Password "
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <small style={{ color: "red" }} className="registerError">
                      {formik.errors.password}
                    </small>
                  ) : null}
                </div>

                <div>
                  <button type="submit">{t("submit")}</button>
                  <button
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    {t("creataccount")}
                  </button>
                </div>
              </form>
            </div>
            <div className="bogurtlen">
              <img
                src="https://dt-faryita.myshopify.com/cdn/shop/files/fruit-single.png?v=1657949644"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="footer"></div>
      </div>
    </>
  );
}

export default Login;
