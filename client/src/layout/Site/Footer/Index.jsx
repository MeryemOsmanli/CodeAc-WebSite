import React from 'react'

function Footer() {
  return (
    <>
      <div className="main-footer-sec">
        <div className="left-box-footer">
          <div className="left-top-footer">
            <p><span>Address:</span> G.Hemidov 50</p>
            <p><span>Email:</span> meryemosmanova24@gmail.com</p>
            {/* <p><span>Mobile:</span> +994707202404</p> */}
            <div>
              <img src="https://faryita.wpengine.com/wp-content/uploads/2024/04/Footer-2-Img.png" alt="" />
            </div>
          </div>
          <div className="left-bottom-footer">
            <div className="icon-box-footer"><i class="fa-brands fa-instagram"></i></div>
            <div className="icon-box-footer"><i class="fa-brands fa-facebook"></i></div>
            <div className="icon-box-footer"><i class="fa-brands fa-linkedin-in"></i></div>
            <div className="icon-box-footer"><i class="fa-brands fa-github"></i></div>
          </div>
        </div>
        <div className="right-box-footer">
          <h4>Useful Links</h4>
          <ul>
            <a href=""><li>Home</li></a>
            <a href=""><li>Contact</li></a>
            <a href=""><li>Blogs</li></a>
            <a href=""><li>Shop</li></a>
            <a href=""><li>FAQ</li></a>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Footer