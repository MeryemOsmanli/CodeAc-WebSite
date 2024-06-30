import React from "react";
import { Badge } from "react-bootstrap";

function Checkout() {
  return (
    <div>
      <form action="">
        <div className="checkout_background">
          <div className="checkout_contain">
            <div className="checkout_left_section">
              <div className="checkout_email_box">
                <h4>Contact</h4>
                <div>
                  <input
                    type="text"
                    placeholder="Email or mobile phone number"
                  />
                </div>
              </div>
              <div className="checkout_delivery_box">
                <h4>Delivery</h4>
                <div>
                  <input type="text" placeholder="Country / Region" />
                  <div className="checkout_name_box">
                    <input
                      type="text"
                      name=""
                      id="name"
                      placeholder="First name"
                    />
                    <input
                      type="text"
                      name=""
                      id="lastname"
                      placeholder="Last name"
                    />
                  </div>
                  <input type="text" placeholder="Address" />
                  <input type="text" placeholder="Apartment, suite,etc." />
                </div>
              </div>
              <div className="checkout_pay_btn">
                <button>Pay Now</button>
              </div>
            </div>
            <div className="checkout_right_section">
              <div className="checkout_product_box">
                <div className="checkout_product_img">
                  <img
                    src="https://402creamery.com/cdn/shop/files/Jason-Doughrulo-Cutout_fab65fa2-da93-4938-9133-3bdac2fb6f41.png?v=1711982097&width=1420"
                    alt=""
                  />
                </div>
                <div className="checkout_product_text">
                  <div className="product_name_subtotal">
                    <h5>TomatoJuice</h5>
                    <p>count:2</p>
                  </div>
                  <div className="product_price-count">
                    <p>$26.00</p>
                    <p>
                      subTotal: <span>$52.00</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="checkout_product_box">
                <div className="checkout_product_img">
                  <img
                    src="https://dt-faryita.myshopify.com/cdn/shop/files/imgicon05_f68cfe9b-e725-480f-8a16-1112f08f9312_200x200.png?v=165511071"
                    alt=""
                  />
                </div>
                <div className="checkout_product_text">
                  <div className="product_name_subtotal">
                    <h5>TomatoJuice</h5>
                    <p>count:2</p>
                  </div>
                  <div className="product_price-count">
                    <p>$26.00</p>
                    <p>
                      subTotal: <span>$52.00</span>
                    </p>
                  </div>
                </div>
              </div>
              <h4>Total:$52</h4>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Checkout;