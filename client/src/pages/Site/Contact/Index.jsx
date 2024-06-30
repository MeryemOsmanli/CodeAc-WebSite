import React from "react";

function Contact() {
  return (
    <>
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
            <h1>Get in touch</h1>
            <p>We'd love to hear from you</p>
          </div>
          <div className="form_content">
            <form className="input_box">
              <div>
                <input type="text" name="" id="" placeholder="Full Name" />
              </div>
              <div>
                <input type="email" placeholder="Email address" />
              </div>
              <div>
                <input type="number" placeholder="Phone number" />
              </div>
              <div>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Message"
                ></textarea>
              </div>
              <div>
                <button>Submit</button>
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
            <h5>Chat with us</h5>
            <p>Chat live with one of our support specialists.</p>
          </div>
          <div className="contact_icons_box">
            <i className="fa-solid fa-user-group"></i>
            <h5>Ask the community</h5>
            <p>Explore our community forums and communicate .</p>
          </div>
          <div className="contact_icons_box">
            <i className="fa-regular fa-circle-question"></i>
            <h5>Support center</h5>
            <p>Browse FAQ's and support articles to find solutions.</p>
          </div>
          <div className="contact_icons_box">
            <i className="fa-solid fa-phone"></i>
            <h5>Call us</h5>
            <p>Call us during normal business hours at (555) 892-9403.</p>
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
