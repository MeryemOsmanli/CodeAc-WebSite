import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
function Contact() {
  const formik = useFormik({
    initialValues: {
      contactName: "",
      contactEmail: "",
      contactContent: "",
      contactNumber: "",
    },
    validationSchema: Yup.object({
      contactName: Yup.string().required("Error Message"),
      contactContent: Yup.string().required("Error Message"),
      contactEmail: Yup.string()
        .email("Invalid email address")
        .required("Error Message"),
    }),
    onSubmit: async (values) => {
      await axios
        .post("http://localhost:3030/sendEmail", values)
        .then((res) => {
          if (res.status == 200) {
            formik.resetForm();
            toast.success("Your Message is successfully sent !");
          } else if (res.status == 500) {
            toast.error("Something went wrong,Please try again");
          }
        });
    },
  });
  const { t, i18n } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("contact")}</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      {/*  hero section start  */}
      <div className="hero_contact">
        <div className="hero_section_text"></div>
      </div>
      {/* hero section end   */}
      {/*  contact form section start  */}
      <div className="contact_form_background container">
        <div className="contact_form">
          <div className="contact_form_text">
            <i className="fa-regular fa-envelope"></i>
            <h1>{t("getintouch")} </h1>
            <p>{t("hearcontact")}</p>
          </div>
          <div className="form_content">
            <form className="input_box" onSubmit={formik.handleSubmit}>
              <div>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.contactName}
                  type="text"
                  name="contactName"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.contactEmail}
                  name="contactEmail"
                  type="email"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.contactNumber}
                  name="contactNumber"
                  type="text"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <textarea
                  onChange={formik.handleChange}
                  value={formik.values.contactContent}
                  name="contactContent"
                  cols="30"
                  rows="10"
                  placeholder="Message"
                ></textarea>
              </div>
              <div>
                <button type="submit">{t("submit")}</button>
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
      {/* <contact form section end   */}
      {/* contact icons section start   */}
      <div className="contact_icons_background">
        <div className="contact_icons_contain container">
          <div className="contact_icons_box">
            <i className="fa-solid fa-comment-dots"></i>
            <h5>{t("chatus")}</h5>
            <p>{t("chattext")}</p>
          </div>
          <div className="contact_icons_box">
            <i className="fa-solid fa-user-group"></i>
            <h5>{t("askcommunity")}</h5>
            <p>{t("asktext")}</p>
          </div>
          <div className="contact_icons_box">
            <i className="fa-regular fa-circle-question"></i>
            <h5>{t("supportcenter")}</h5>
            <p>{t("supporttext")}</p>
          </div>
          <div className="contact_icons_box">
            <i className="fa-solid fa-phone"></i>
            <h5>{t("callus")}</h5>
            <p>{t("calltext")}</p>
          </div>
        </div>
      </div>
      {/*contact icons section end   */}
      {/* map section  start */}
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31327.056950652583!2d77.044357!3d11.047464!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x181af0c54e886b2e!2siamdesigning!5e0!3m2!1sen!2sus!4v1648109956644!5m2!1sen!2sus"
          frameborder="0"
        ></iframe>
      </div>
      {/*  map section  end   */}
    </>
  );
}

export default Contact;

