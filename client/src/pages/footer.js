import React from "react"
import { Link } from "react-router-dom";
import { AiFillLinkedin,AiFillGithub,AiFillInstagram } from "react-icons/ai";

import '../css/footer.css'
const Footer =()=>{
    return(<>
    <div class="footer">
      <div class="heading">
        <h2 className="smalltitle">HEALTH-IS-WEATH<sup>&trade;</sup></h2>
      </div>
      <div class="content">
      
         
        <div class="social-media">
          <h4>Social</h4>
          <p>
            <a href="https://www.linkedin.com/in/pramod-mahajan-a717771b1">
            <AiFillLinkedin/> Linkedin</a>
          </p>
         
          <p>
            <a href="https://github.com/pramodmahajan14">
               <AiFillGithub/> Github</a>
          </p>
        
          <p> <a href="">
               <AiFillInstagram/>  Instagram</a></p>
        </div>
        <div class="links">
          <h4>Quick links</h4>
          <p><Link to=""><a>Home</a></Link></p>
          <p><Link to="/about"><a>About</a></Link></p>
          <p><Link to="/recipes"><a>Dishes</a></Link></p> 
        </div>
        <div class="details">
          <h4 class="address">Address</h4>
          <p>Pune Maharastra , <br />India</p>
          <h4 class="mail">Email</h4>
          <p><a href="#">2085pramodmahajan@gmail.com</a></p>
        </div>
      </div>
      <footer>
        <hr />
        &copy; 2021 ABCDEF Technologies Pvt. Ltd.
      </footer>
    </div>
</>)}
export default Footer;
