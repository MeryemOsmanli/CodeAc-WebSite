import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { postSubscribers } from "../../../redux/slices/subscribersSlice";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
function Team() {
  const { t, i18n } = useTranslation();

  const { ourTeam } = useSelector((state) => state.ourTeam);
  const location = useLocation();
  const { subscribers } = useSelector((state) => state.subscribers);
  const submitRef = useRef();
  const dispatch = useDispatch();
  const subscribeRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      subscriberGmail: "",
    },
    validationSchema: Yup.object({
      subscriberGmail: Yup.string().email("Invalid email address"),
    }),
    onSubmit: async (values) => {
      const emailExists = subscribers.some(
        (user) => user.subscriberGmail === values.subscriberGmail
      );
      if (emailExists) {
        toast.error(
          "Email already exists. Please use a different email address.",
          {
            position: "bottom-left",
          }
        );
      } else {
        const response = await dispatch(postSubscribers(values));
        if (response.payload !== undefined) {
          submitRef.current.classList.replace("d-none", "d-flex");
          formik.resetForm();
          setTimeout(() => {
            submitRef.current.classList.replace("d-flex", "d-none");
          }, 2000);
        }
      }
    },
  });
  return (
    <>
      <Helmet>
        <title>{t("team")}</title>
        <link rel="canonical" href="https:www.tacobell.com/" />
      </Helmet>
      {/*  hero section start   */}
      <div className="hero_team"></div>
      {/*  hero section end   */}
      {/*  team memmebrs section start   */}
      <div className="team_text_box">
        <h2>{t("ourteam")} </h2>
      </div>
      <div className="team_contain_box">
        <div className="team_contain container">
          {ourTeam?.map((item, index) => {
            return (
              <div className="cardDiv" key={index}>
                <img src={item.image} alt="" />
                <div className="cardName">
                  <p>{item.title}</p>
                </div>
                <div className="cardPosition">
                  <p>{item.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/*  team memmebrs section end   */}
      {/*  offer form section start   */}
      <div className="offer_sec">
        <div className="offer_image">
          <img
            src="https://dt-faryita.myshopify.com/cdn/shop/files/after_image-orange_top.png?v=1657021307"
            alt=""
          />
        </div>
        <div className="offer_form">
          <div className="offer_form_head">
            <h2>{t("newsletter")} </h2>
          </div>
          <div className="offer_form_parag">
            <p>{t("specialorder")} </p>
          </div>
          <div className="offer_form_inp_btn">
            <div className="offer_inp">
              <form onSubmit={formik.handleSubmit}>
                <input
                  ref={subscribeRef}
                  type="email"
                  value={formik.values.subscriberGmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="subscriberGmail"
                  placeholder="Your email address"
                />
                <div className="offer_btn">
                  <button disabled={!subscribeRef.current?.value} type="submit">
                    {t("subscribe")}
                  </button>
                </div>
              </form>
            </div>
            {formik.touched.subscriberGmail && formik.errors.subscriberGmail ? (
              <small style={{ color: "red" }}>
                {formik.errors.subscriberGmail}
              </small>
            ) : null}
          </div>
          <p className="d-none text-success" ref={submitRef}>
            {t("thankssubscribe")}
          </p>
        </div>
      </div>

      {/*  offer form section end   */}
    </>
  );
}

export default Team;
