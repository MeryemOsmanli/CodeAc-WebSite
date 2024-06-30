import React from "react";
import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";

function Faq() {
  const { questions } = useSelector((state) => state.questions);

  const firstType = questions.filter(
    (x) => x.type == "Answers To Your Questions"
  );
const secondType = questions.filter((x) => x.type == "Payment Information");
  return <>
         {/* faq header section start */}
         <div className="header_image_faq">
        <div className="overlay_shop">
          <div className="shoph1">FAQ</div>
          <img src="https://faryita.wpengine.com/wp-content/uploads/2024/03/Breadcrumb-main-1.png" alt="" />
          
           </div>
      </div>
    <div className="svg">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffc935" fill-opacity="1" d="M0,160L48,138.7C96,117,192,75,288,80C384,85,480,139,576,181.3C672,224,768,256,864,240C960,224,1056,160,1152,144C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
    </div>
      {/* faq header section end */}



            {/* faq answer questions section start */}
            <div className="faq_background">
        <div className="faq_text_contain container">
          <div className="faq_head_text">
            <h4>We are here to help </h4>
            <h2>Answers to your questions</h2>
          </div>
          <div className="faq_questions_container">
            {firstType?.map((i, x) => {
              return (
                <div key={x} className="faq_box">
                  <h6>{i.title}</h6>
                  <p>{i.content}</p>
                </div>
              );
            })}
                {/* <div className="faq_box">
                  <h6>WHAT SHIPPING METHODS ARE AVAILABLE?</h6>
                  <p>Kilres ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
                </div>    
                <div className="faq_box">
                  <h6>WHAT SHIPPING METHODS ARE AVAILABLE?</h6>
                  <p>Kilres ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
                </div>
                <div className="faq_box">
                  <h6>WHAT SHIPPING METHODS ARE AVAILABLE?</h6>
                  <p>Kilres ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
                </div> */}
          </div>
          <div className="faq_head_text">
            <h2>Payment Information </h2>
          </div>
          <div className="faq_questions_container">
            {secondType?.map((i, x) => {
              return (
                <div key={x} className="faq_pay_answer_box">
                   <h6>{i.title}</h6>
                  <p>{i.content}</p>
                  {/* <h6>WHAT PAYMENT METHODS ARE ACCEPTED?</h6>
                  <p>Rhulsk feses dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p> */}
                </div>
               
              );
             })}
          </div>
        </div>
      </div>
      {/* faq answer questions section end */}


      
      {/* start faq pink section  */}
      <div className="faq-pink-sec-background">
        <div className="faq-pink-sec">
          <div className="faq-pink-left">
            {/* <img src="https://faryita.wpengine.com/wp-content/uploads/2024/03/Blog-Detail-Image-1.jpg" alt="" /> */}
            <img src="https://faryita.wpengine.com/wp-content/uploads/2024/03/h3-faq-off-img.png" alt="" />
          </div>
          <div className="faq-pink-right">
            <h1>Commonly Asked Questions</h1>
          <Accordion style={{border:"1px solid gray"}}   >
      <Accordion.Item  eventKey="0">
        <Accordion.Header >How Your Juices Are Packed?</Accordion.Header>
        <Accordion.Body>
        Commodo elit at imperdiet dui accumsan sit amet. Laoreet suspendisse interdum consectetur libero id faucibus. A scelerisque purus semper eget duis. Quis varius quam quisque id diam vel quam. Risus ultricies tristique nulla aliquet enim tortor at auctor. Tortor condimentum lacinia quis vel eros. Convallis posuere morbi leo urna. Tempus quam pellentesque nec nam aliquam sem et tortor consequat.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>What Are You Popular Juice Varieties?</Accordion.Header>
        <Accordion.Body>
        Nec ullamcorper sit amet risus nullam eget felis eget nunc. Tincidunt vitae semper quis lectus. Aliquam ut porttitor leo a diam sollicitudin tempor id. Consequat id porta nibh venenatis cras sed felis eget velit. Magna fringilla urna porttitor rhoncus dolor purus non enim praesent. Sem integer vitae justo eget. Duis at tellus at urna condimentum mattis pellentesque.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Which Juice Is The Best For Diabetics?</Accordion.Header>
        <Accordion.Body>
        A cras semper auctor neque vitae tempus quam pellentesque nec. Molestie at elementum eu facilisis sed. Vestibulum mattis ullamcorper velit sed. Sollicitudin aliquam ultrices sagittis orci a. Erat pellentesque adipiscing commodo elit. Purus sit amet luctus venenatis lectus magna fringilla urna. Id venenatis a condimentum vitae. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Which Juice Is Good For Weight Gain?</Accordion.Header>
        <Accordion.Body>
        Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Quis enim lobortis scelerisque fermentum dui. Senectus et netus et malesuada. Elit pellentesque habitant morbi tristique senectus et netus et. Nibh praesent tristique magna sit amet purus. Dictum sit amet justo donec. Elit duis tristique sollicitudin nibh sit. Viverra suspendisse potenti nullam ac.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Why Do Some Of The Juices Have Distinct Flavors?</Accordion.Header>
        <Accordion.Body>
        Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Quis enim lobortis scelerisque fermentum dui. Senectus et netus et malesuada. Elit pellentesque habitant morbi tristique senectus et netus et. Nibh praesent tristique magna sit amet purus. Dictum sit amet justo donec. Elit duis tristique sollicitudin nibh sit. Viverra suspendisse potenti nullam ac.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header>Which Is The Most Nutritious Juice?</Accordion.Header>
        <Accordion.Body>
        Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Quis enim lobortis scelerisque fermentum dui. Senectus et netus et malesuada. Elit pellentesque habitant morbi tristique senectus et netus et. Nibh praesent tristique magna sit amet purus. Dictum sit amet justo donec. Elit duis tristique sollicitudin nibh sit. Viverra suspendisse potenti nullam ac.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
          </div>
        </div>
      </div>
      {/* end faq pink section  */}
  </>;
}

export default Faq;
