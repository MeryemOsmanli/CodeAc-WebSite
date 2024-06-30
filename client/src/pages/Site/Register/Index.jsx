import React from "react";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
function Register() {
  const { t, i18n } = useTranslation();

  const { users } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      gmail: "",
      profileImage: "",
      isAdmin: false,
      isLogin: false,
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      username: Yup.string().required("User Name is required"),
      profileImage: Yup.string().required("Profile Image is required"),
      gmail: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          passwordRegex,
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)"
        ),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),

    onSubmit: async (values) => {
      const emailExists = users.some((user) => user.gmail === values.gmail);

      if (emailExists) {
        toast.error(
          "Email already exists. Please use a different email address."
        );
      } else if (values.confirmPassword !== values.password) {
        toast.error("Passwords do not match");
      } else {
        const response = await dispatch(registerUser(values));
        if (response.payload != undefined) {
          formik.resetForm();
          navigate("/login");
        }
      }
    },
  });
  return (
    <>
      <Helmet>
        <title> {t("register")}</title>
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
                <h1>{t("creataccount")} </h1>
                <span>{t("homecreateaccount")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="contact_form_background container">
          <div className="contact_form">
            <div className="contact_form_text">
              <i className="fa-regular fa-envelope"></i>
              <h1>{t("getintouch")}</h1>
              <p>{t("hearcontact")} </p>
            </div>
            <div className="form_content">
              <form className="input_box" onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="Full Name"
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <small style={{ color: "red" }} className="registerError">
                      {formik.errors.fullName}
                    </small>
                  ) : null}
                </div>
                <div>
                  <input
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="User Name"
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <small style={{ color: "red" }} className="registerError">
                      {formik.errors.username}
                    </small>
                  ) : null}
                </div>
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
                    name="profileImage"
                    value={formik.values.profileImage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="Profile Image "
                  />
                  {formik.touched.profileImage && formik.errors.profileImage ? (
                    <small style={{ color: "red" }} className="registerError">
                      {formik.errors.profileImage}
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
                  <input
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    placeholder="Confirm Password "
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <small style={{ color: "red" }} className="registerError">
                      {formik.errors.confirmPassword}
                    </small>
                  ) : null}
                </div>
                <div>
                  <button type="submit">{t("create")} </button>
                  <button>
                    <a href="https://demo.htmlcodex.com/1362/ice-cream-shop-website-template/img/header.jpg">
                      {t("returnstore")}
                    </a>
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

export default Register;
