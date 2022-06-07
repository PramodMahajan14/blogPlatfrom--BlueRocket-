import React,{ useState} from "react";
import { Link } from "react-router-dom";
import "../css/home.css";
import '../css/Nav2css.css';
import Menu from "./Menu";
import pic4 from '../Images/pic4.svg'
import '../index.css'
const backgroundimage ="https://media.istockphoto.com/photos/different-approach-different-direction-picture-id1250056176?b=1&k=20&m=1250056176&s=170667a&w=0&h=MlWBTZUot1FyK-FvBCdkVF3IqyiGuxdlisfQsupCxtM=";
const logo = "https://api.freelogodesign.org/files/780354e018c34629a943c96c60bb0259/thumb/logo_200x200.png?v=637710899690000000";
const logo1 = "https://api.freelogodesign.org/files/d06b907a753445fd83b84886a823d62f/thumb/logo_200x200.png?v=0";
const Nav = () => {
 const [navbar,setnavbar] =useState(false);
  const updatenavbar =()=>{
   // console.log(window.screenY)
   if(window.scrollY >= 341){
     setnavbar(true);
   }else{
     setnavbar(false);
   } 
   
  }
  window.addEventListener('scroll',updatenavbar);

  const [Mnavbar,Msetnavbar] =useState(false);
  const Mupdatenavbar =()=>{
   // console.log(window.screenY)
   if(window.scrollY >= 426){
     Msetnavbar(true);
   }else{
     Msetnavbar(false);
   } 
   
  }
  window.addEventListener('scroll',Mupdatenavbar);
    return (<>
     {/* Nav bar for lock home page */}
    <div style={{backgroundImage:`url(${backgroundimage})`, Width:'100%',borderBottom:'1px solid black',opacity:"1.5",
  backgroundRepeat:'no-repeat',minHeight:'400px',backgroundPosition:'top',WebkitBackgroundSize:'cover',objectFit:'cover'}} >
  <nav className="mobile-menu">
 
             <label for="show-menu" className="show-menu"><div className={Mnavbar ? 'mobilenav active':'mobilenav'}><img src={logo} className="logo" /><Link to={'/signup'}><button className="getstart" id="getbutton">GetStarted</button></Link></div></label>
		        <ul id="menu" className={navbar ? 'mynav active':'mynav'}>
              <img src={logo} style={{width:"4rem",position:'relative',float:'left'}} className="anim" />
		            <li><Link to={'/signin'}><a href="#"><button className="signin"><i className="blue user icon"></i>Login</button></a></Link></li>
		            <li><Link to={'/signup'}><a href="#"><button className="getstart">Get Started</button></a></Link></li>
                
	          </ul>
            
  </nav>
      
  <section id="header" className="d-flex align-item-center">
 <div className="container-fluid nav_bg">
       <div className="row">
           <div className="col-11 mx-auto">
           <div className="row">
             <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
               <h1>Grow your Knowledge with <strong className="brand-name">BlueRocket</strong></h1>
               <h2 className="my-3">It's easy and free to post your thinking on any topic</h2>
               <h2 className="ui header" > It's place  true  <br/>for your thinking to take off.</h2>
               <div className="mt-10">
             
               <Link to={'/signin'} ><button className="ui inverted gray basic button">Write Story...</button></Link>
               </div>
             </div>
             <div className="col-lg-6 order-1 order-lg-2 header-imgae mt-2">
                 <img src={pic4} className="img-fluid animated" alt="home img" />
             </div>
            </div>
           </div>
       </div>
   </div>
 </section>  
   
      </div>
    
     
     
            
      </>   
    );
  };
  export default Nav;

  // <div className="ui container" id="heading">&nbsp; 
  //       <div style={{marginTop:'-3rem',fontFamily:'Showcard-gothic',color:'rgba(0, 0, 128, 0.26)'}}>
  //           <h1 >BLUE </h1>
  //           <h1 style={{marginTop:'-2.5rem'}}>ROCKET</h1>
  //       </div>
  //        <h1 className="ui header" style={{margin:'-1rem'}}> It's place  true  <br/>for your thinking to take off.</h1>
  //          <p>It's easy and free to post your thinking on any topic</p>
  //         <Link to={'/signin'} ><button className="ui inverted gray basic button">Write Story...</button></Link>
           
        
         
          
      
          
  //          <h5>Just write every day of your life. Read intensely. Then see what happens.</h5>
        
         
  //   </div>