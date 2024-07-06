import { useFormik } from "formik";
import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { postSubscribers } from "../../../redux/slices/subscribersSlice";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
function Home() {
  const { subscribers } = useSelector((state) => state.subscribers);
  const submitRef = useRef();
  const dispatch = useDispatch();
  const subscribeRef = useRef(null);
  const { t, i18n } = useTranslation();
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
        <title>home </title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      {/*  start first section grayfurt */}
      <div className="grayfurt-sec-background">
        <div className="grayfurt-sec">
          <div className="left-box-grayfurt">
            <img
              src="https://ohlala.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/09/ice_cream_gallery_01.jpg"
              alt=""
            />
          </div>
          <div className="middle-box-grayfurt">
            <img
              src="https://ohlala.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/09/ice_cream_gallery_04.jpg"
              alt=""
            />
            <div className="middle-box-grayfurt-hover">
              <span>!NEW!NEW!NEW!NEW!NEW!NEW</span>
              <h1>Fruit Havors!</h1>
            </div>
          </div>
          <div className="right-box-grayfurt">
            <img
              src="https://ohlala.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/09/ice_cream_gallery_06.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      {/*  end first section grayfurt */}
      {/*  start second section melon */}

      <div className="melon-sec-background">
        <div className="melon-sec">
          <div className="left-box-melon">
            <img
              src="https://ohlala.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/09/ice_cream_gallery_02.jpg"
              alt=""
            />
            <div className="left-box-melon-hover">
              <h1>Delivery!</h1>
            </div>
          </div>
          <div className="middle-box-melon">
            <img
              src="https://ohlala.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/09/ice_cream_gallery_05.jpg"
              alt=""
            />
          </div>
          <div className="right-box-melon">
            <img
              src="https://ohlala.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/09/ice_cream_gallery_03.jpg"
              alt=""
            />
            <div className="right-box-melon-hover">
              <h1>Check out our monthly menu!</h1>
            </div>
          </div>
        </div>
      </div>
      {/*  end second section melon */}

      {/* start third section chocolate ice cream */}
      <div className="chocolate-sec-background">
        <div className="chocolate-sec">
          <div className="left-box-chocolate">
            <div>
              <span>THIS SUMMER OUR SPECIALTY</span>
              <h1>Chocolate is the world's favorite flavor!</h1>
              <button>DISCOVER</button>
            </div>
          </div>
          <div className="right-box-chocolate">
            <img
              src="https://ohlala.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/09/inner_ice_creams_09.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* end third section chocolate ice cream */}

      {/* start fourth section colorfull ice cream */}
      <div className="colorfull-sec-background">
        <div className="colorfull-sec">
          <div className="left-box-colorfull">
            <img
              src="https://ohlala.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/09/inner_ice_creams_01.jpg"
              alt=""
            />
          </div>
          <div className="right-box-colorfull">
            <div>
              <span>STRAWBERRY LEMON MENTA</span>
              <h1>Multi colored ice cream dream</h1>
              <p>
                In a city, in hot summer, cooling off with a creamy gelato is
                pure common sense. Don't miss to try them and let us know!
              </p>
              <button>DISCOVER</button>
            </div>
          </div>
        </div>
      </div>
      {/* end fourth section colorfull ice cream */}

      {/* start fifth section eaten ice cream */}
      <div className="eaten-sec-background">
        <div className="eaten-sec">
          <div className="left-box-eaten">
            <div>
              <span>LET US SHOW YOU OUR BEST</span>
              <h1>Strawberry ice dreams forever</h1>
              <p>
                Watermelon sweets, fresh fruit ice creams, extraordinary and
                outstanding flavors are several major components.
              </p>
              <button>DISCOVER</button>
            </div>
          </div>
          <div className="right-box-eaten">
            <img
              src="https://ohlala.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/09/ice_cream.gif"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* end fifth section eaten ice cream */}

      {/* start sixth section location */}
      <div className="location-sec-background">
        <div className="location-sec">
          <div className="left-box-location">
            <div>
              <h1>Locations</h1>
              <a href="">
                <button>See Location</button>
              </a>
            </div>
          </div>
          <div className="middle-box-location">
            <img
              src="https://ohlala.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/09/inner_ice_creams_10.jpg"
              alt=""
            />
          </div>
          <div className="right-box-location">
            <div>
              <h1>Call Us!</h1>
              <p>Our delivery service works from 10 AM to 8 PM</p>
              <button>+994-70-720-24-04</button>
              <h6>
                There is a minimum of $15.00 for delivery and a $5.00 delivery
                fee.
              </h6>
            </div>
          </div>
        </div>
      </div>
      {/* end sixth section location */}

      {/* start seventh section email  */}
      <div className="email-sec-background">
        <div className="email-sec">
          <div className="left-box-email">
            <img
              src="https://ohlala.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/09/inner_ice_creams_07.jpg"
              alt=""
            />
          </div>
          <div className="right-box-email">
            <div>
              {/* <input type="text" placeholder="Enter your email"/>
         <button>GO</button> */}
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
                  <button disabled={!subscribeRef.current?.value} type="submit">
                  GO
                  </button>
              </form>
            {formik.touched.subscriberGmail && formik.errors.subscriberGmail ? (
              <small style={{ color: "red" }}>
                {formik.errors.subscriberGmail}
              </small>
            ) : null}
          <p className="d-none text-success" ref={submitRef}>
          {t("thankssubscribe")}
          </p>
            </div>
          </div>
        </div>
      </div>
      {/* end seventh section email  */}
      {/* start eighth section shop */}
      <div className="shop-sec-background">
        <div className="shop-sec">
          <div className="left-box-shop">
            <div>
              <span>GET DAILY DISCOUNTS!</span>
              <h1>Visit our online shop</h1>
              <a href="">
                <button>VISIT</button>
              </a>
            </div>
          </div>
          <div className="right-box-shop">
            <img
              src="https://ohlala.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/09/inner_ice_creams_08.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* end eighth section shop */}
    </>
  );
}

export default Home;
