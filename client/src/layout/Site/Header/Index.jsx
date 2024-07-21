import React from "react";
import {
  Badge,
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logOut, updateUserIsLogin } from "../../../redux/slices/userSlice";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";

const Header = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.users);
  const { t, i18n } = useTranslation();

  return (
    <>
      <Navbar sticky="top" expand="lg" className="bg-body ">
        <Container fluid>
          <Navbar.Brand href="#">Emil's shitils</Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">{t("home")}</Nav.Link>
              <Nav.Link href="/contact">{t("contact")}</Nav.Link>
              {/* <Nav.Link href="/blogs">{t("blogs")}</Nav.Link> */}
              <Nav.Link href="/shop">{t("shop")}</Nav.Link>
              <Nav.Link href="/team">{t("team")}</Nav.Link>
              {/* <NavDropdown.Item href="/team">{t("team")}</NavDropdown.Item> */}
              {/* <Nav.Link href="/faq">{t("faq")}</Nav.Link> */}
              <NavDropdown
                  title={t("aboutus")}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="/faq">
                    {t("faq")}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/blogs">
                    {t("blogs")}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>

              {userToken?.isLogin == true ? (
                ""
              ) : (
                <NavDropdown
                  title={t("registration")}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="/login">
                    {t("login")}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/register">
                    {t("register")}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              )}
           
             
              {userToken?.isLogin == true ? (
                <NavDropdown title={t("account")} id="navbarScrollingDropdown">
                  <NavDropdown.ItemText>
                    <p>{userToken?.fullName}</p>
                  </NavDropdown.ItemText>
                  <NavDropdown.ItemText>
                    <button
                      onClick={() => {
                        dispatch(
                          updateUserIsLogin({
                            id: userToken?.id,
                            newData: { isLogin: false },
                          })
                        );
                        dispatch(logOut());
                      }}
                      className="btn btn-danger"
                    >
                      {t("logout")}
                    </button>
                  </NavDropdown.ItemText>
                  <NavDropdown.Divider />
                </NavDropdown>
              ) : (
                ""
              )}

              <Nav.Link href="/basket">
                <i
                  className="fa-solid fa-bag-shopping"
                  style={{ fontSize: "20px" }}
                >
                  {userToken?.isLogin == true ? (
                    <Badge
                      className="bg-transparent text-light"
                      style={{ fontSize: "11px" }}
                    >
                      {userToken?.basket?.length}
                    </Badge>
                  ) : (
                    ""
                  )}
                </i>
              </Nav.Link>
              <Nav.Link href="/wishlist">
                <i
                  className="fa-regular fa-heart"
                  style={{ color: "white" }}
                ></i>
              </Nav.Link>
              <Nav.Link>
                <div>
                  <button
                    className="langbtn"
                    onClick={() => {
                      i18n.changeLanguage("az");
                    }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/1200px-Flag_of_Azerbaijan.svg.png"
                      alt=""
                    />
                  </button>
                  <button
                    className="langbtn"
                    onClick={() => {
                      i18n.changeLanguage("en");
                    }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/640px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
                      alt=""
                    />
                  </button>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
