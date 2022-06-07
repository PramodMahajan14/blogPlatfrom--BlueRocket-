import React, { useState } from "react";
import "../css/mainfooter.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Footer = () => {
  const [email, setemail] = useState();
  const [sugg, setsugg] = useState();
  const [sucess, setsucess] = useState(false);
  const [err, seterr] = useState(false);

  const handleClose = () => {
    seterr(false);
    setsucess(false);
  };
  const SendSugg = () => {
    if (!email || !sugg) seterr(true);
    setsucess(true);
  };
  return (
    <>
      <footer class="footer-section">
        <div class="container">
          <div class="footer-cta pt-5 pb-5">
            <div class="row">
              <div class="col-xl-6 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="fas fa-map-marker-alt"></i>
                  <div class="cta-text">
                    <h4>Find us</h4>
                    <span>Amebegaon(bk) sinhgad road pune</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="fas fa-phone"></i>
                  <div class="cta-text">
                    <h4>Call us</h4>
                    <span>9022471779</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="far fa-envelope-open"></i>
                  <div class="cta-text">
                    <h4>Mail us</h4>
                    <span>codedev90@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="footer-content pt-5 pb-5">
            <div class="row">
              <div class="col-xl-4 col-lg-4 mb-50">
                <div class="footer-widget">
                  <div class="footer-logo">
                    <a href="index.html">
                      <img
                        src="https://api.freelogodesign.org/files/780354e018c34629a943c96c60bb0259/thumb/logo_200x200.png?v=637710899690000000"
                        class="img-fluid"
                        alt="logo"
                      />
                    </a>
                    <span className="ftitle">BlueRocket</span>
                  </div>
                  <div class="footer-text">
                    <p>
                      Discover stories, thinking, and expertise from writers on
                      any topic.
                    </p>
                  </div>
                  <div class="footer-social-icon">
                    <span>Follow us</span>
                    <a href="https://www.facebook.com/pramod.mahajan.7315720">
                      <i class="fab fa-facebook-f facebook-bg"></i>
                    </a>
                    <a href="https://github.com/PramodMahajan14">
                      <i class="fab fa-github github-bg" id="git"></i>
                    </a>
                    <a href="#">
                      <i class="fab fa-instagram instagram-bg" id="insta"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
                <div class="footer-widget">
                  <div class="footer-widget-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">about</a>
                    </li>
                    <li>
                      <a href="#">services</a>
                    </li>
                    <li>
                      <a href="#">portfolio</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                    <li>
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <a href="#">Our Services</a>
                    </li>
                    <li>
                      <a href="#">Expert Team</a>
                    </li>
                    <li>
                      <a href="#">Contact us</a>
                    </li>
                    <li>
                      <a href="#">Latest News</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div class="footer-widget">
                  <div class="footer-widget-heading">
                    <h3>Suggestion</h3>
                  </div>
                  <div class="footer-text mb-20">
                    <textarea
                      id="description"
                      cols="20"
                      rows="2"
                      name="sugg"
                      value={sugg}
                      onChange={(e) => setsugg(e.target.value)}
                      placeholder="Enter your thing"
                      className="group__controle"
                    ></textarea>
                  </div>

                  <div class="subscribe-form">
                    {/* <form action="#"> */}

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                    <button onClick={SendSugg}>
                      <i class="fab fa-telegram-plane"></i>
                    </button>

                    {/* </form> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright-area">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-lg-6 text-center text-lg-left">
                <div class="copyright-text">
                  <p>
                    Copyright &copy; 2022, All Right Reserved{" "}
                    <a href="https://github.com/PramodMahajan14">
                      Mahajan Team
                    </a>
                  </p>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                <div class="footer-menu">
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Terms</a>
                    </li>
                    <li>
                      <a href="#">Privacy</a>
                    </li>
                    <li>
                      <a href="#">Policy</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={sucess} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {sugg} ,{email}
          </Alert>
        </Snackbar>

        <Snackbar open={err} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            error
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};
export default Footer;
