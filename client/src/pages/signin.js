import React,{useState} from 'react'
import '../../node_modules/semantic-ui-css'
import './login_f.css'
// import '../css/signup.css'
// import '../index.css'
import '../css/socialLogin.scss'
import pic2  from '../Images/pic2.svg'
import { useHistory } from 'react-router';
import {useDispatch} from 'react-redux'
import { loginuser } from '../redux/Action/blogAction';
import locket from '../css/loginform_logo.svg'
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FaBorderNone, FaFacebook} from "react-icons/fa"
import Footer from '../components/footer';
import axios from 'axios'

const backg = "https://image.freepik.com/free-vector/halftone-background-with-circles_23-2148907689.jpg";
const logo = "https://api.freelogodesign.org/files/780354e018c34629a943c96c60bb0259/thumb/logo_200x200.png?v=637710899690000000";
const profilepic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";




let myresponse ;
const  SignIn = ()=>{
    document.title="Login your account"
    const[loading,setloading] = useState(false)
    const [email,setemail] = useState('');
    const[password,setpassword] = useState('');
    
    const[message,setmessage] = useState(true);
    const dispatch = useDispatch()
    const hist= useHistory();
   
    const LoginUser =async(e)=>{
        setloading(true)
        e.preventDefault();
        const response = await fetch('/user/login',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        });
         const data = await response.json();
        setloading(false)
        console.log(data);
        localStorage.setItem('firstLogin',true)
        if(data.statuscode === 200 ){
             dispatch(loginuser())
             hist.push('/user')
        }else{ 
          myresponse = data.msg;
           
            setmessage(false);
        }
    }
    const hidemessage=()=>{
        setmessage(true);
    }
    const responseGoogle =async(response)=>{
         try{
            
              const resp = await axios.post('/user/google_login',{tokenId: response.tokenId});
              localStorage.setItem('firstLogin',true);
              console.log(resp)
              if(resp.status === 200){
                dispatch(loginuser())
                  hist.push('/user')
                  
              }
             hist.push('/user')
         }catch(err){
             console.log(err);
         }
    }
    const responseFacebook =async(response)=>{
        console.log(response)
    }

    const mystyle = {
        backgroundColor: "DodgerBlue",
        position: "absolute",
        top: "125px",
        left: "125px",
        width: "100px",
        height: "100px"
    };

  
    return(<>
    <div className="navbar">
	<Link to={'/'}> <span className="left_icon"><i class="arrow circle left icon"></i></span ></Link>
    <h2 className="ui right floated header"><Link to={'/signup'}><h5 className='signup_header'>SignUp</h5></Link></h2>
	</div>
   
    
 
    
    {/* message */}
    <div  className={message ? ' message ':'ui error message visible'}><i onClick={hidemessage} class="close icon"></i>{myresponse}</div>
    {/* ------ */}
       
    
               {/* ---------------------------login=form------------------------------------------------------------- */}
  <div className="container" id="login">
  {/* <div className="column"> */}
      <form className="ui form">
          <div className="ui segment">
              
              <div className="ui center aligned basic segment">
                  <form className="ui form">
                      <div className="field">
                          <div className="ui center float">
                          <h1><img src={logo} className="logo_img1" style={{height:'4rem'}}/></h1>
              <h2>Log in to your account</h2>
                          </div>
                      </div> 
                      <div className="field">
                          <div className="ui left input">
                              <input type="text" name="email" placeholder="Email adress"
                                  value={email} onChange={(e)=>setemail(e.target.value)}
                              />
                          </div>
                      </div>
                      <div className="field">
                          <div className="ui left input">
                              <input type="password" name="password" placeholder="Password"
                                  value={password} onChange={(e)=>setpassword(e.target.value)}
                              />
                          </div>
                      </div>
                      <button className="ui primary fluid button" type="submit" onClick={LoginUser}>
                      {loading ? <div style={{cursor:"no-drop"}}><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
		                   <span > Please Wait...</span></div>:<span>Login</span>
						  }
                      </button>
                    
                  </form>
                  <h4 className="ui horizontal divider header" id="divi">OR</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }} className="loginBtn" >
                       <GoogleLogin
                            clientId="543504059232-lkuhhrcs7gcqk4v9of3co4c0dsiclrsh.apps.googleusercontent.com"
                            onSuccess={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className="login-with-google-btn"
                        />
                        <FacebookLogin
                            appId="2783832311918073"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            id="face"
                            cssClass="login-with-google-btn face"
                        ><i class="angle double down icon"></i>
                        </FacebookLogin>
                    </div>
                    
                  <Link to={'signin/resetpassword'}><a href="#">Forgot password?</a></Link>
              </div>
          </div>
       
      </form>
  {/* </div> */}
  </div>
  {/* -------------------------------------------login form end-------------------------------------------------- */}
         

  <Footer/>
    
    </>)
}
export default  SignIn;


{/* <GoogleLogin
clientId="543504059232-lkuhhrcs7gcqk4v9of3co4c0dsiclrsh.apps.googleusercontent.com"
buttonText="Login with google"
onSuccess={responseGoogle}
cookiePolicy={'single_host_origin'}
/> */}


{/* <GoogleLogin
clientId="543504059232-lkuhhrcs7gcqk4v9of3co4c0dsiclrsh.apps.googleusercontent.com"
onSuccess={responseGoogle}
cookiePolicy={'single_host_origin'}
/> */}
// onClick={LoginUser}>
// value={email} onChange={(e)=>setemail(e.target.value)
// value={password} onChange={(e)=>setpassword(e.target.value)