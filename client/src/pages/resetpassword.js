import React, { useState } from 'react'
import '../../node_modules/semantic-ui-css'
import './login_f.css'
import '../css/signup.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

const backg2 = "https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?size=338&ext=jpg";
const logo = "https://api.freelogodesign.org/files/780354e018c34629a943c96c60bb0259/thumb/logo_200x200.png?v=637710899690000000";
let myresponse;
let myres;
const  Resetpassword = ()=>{
	document.title="Forget Password";
	const[message,setmessage] = useState(true);
	const[successmessage,setsuccessmessage] = useState(true);
	const[email,setemail] = useState('')

	const sendEmail = async(e)=>{
		e.preventDefault();
        const response = await fetch('/user/forgot',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email})
        });
		const data = await response.json();
		myresponse = data.msg;
		myres  = data.msg1;
        // console.log(data);
        if(data.statuscode === 200 ){
           
            setsuccessmessage(false);
        }else{
            
          myresponse = data.msg;
            setmessage(false);

        }
	}
	const hidemessage=()=>{
        setmessage(true);
		setsuccessmessage(true)
    }
    return(<><div style={{height:'100vh'}}>
	<div className="navbar">
	<Link to={'/signin'}> <span className="left_icon"><i class="arrow circle left icon"></i></span ></Link>
	</div>
	<div style={{backgroundImage:`url(${backg2})`, Width:'100%',borderBottom:'1px solid black',opacity:"1.5",
  backgroundRepeat:'no-repeat',backgroundPosition:'top',WebkitBackgroundSize:'cover',objectFit:'cover'}} >
	  {/* error message */}
	  <div  className={message ? ' message ':'ui error message visible'}><i onClick={hidemessage} class="close icon"></i>{myresponse}</div>
        {/* ------ */}
        {/*success message */}
         <div  className={successmessage ? ' message ':'ui green message visible'}><i onClick={hidemessage} class="close icon"></i>
		 <div className="header">{myresponse}</div>
		 <p>{myres}</p>
		 </div>
        {/* ------ */}
	<div className="ui container form-page" style={{height:'100vh',width:'100%'}}>
	 <div className="ui middle aligned center aligned grid" style={{marginTop:'2rem'}}>
	<div className="column">
		<form className="ui form">
			<div className="ui segment">
				<h1><img src={logo} style={{height:'4rem'}}/></h1>
				<h3>Forgot Password</h3>
			<p>To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</p>
				<div className="ui center aligned basic segment">
					<form className="ui form">
						<div className="field">
							<div className="ui left input">
								<input type="text" name="email" placeholder="Email adress"
									value={email} onChange={(e)=>setemail(e.target.value)}
								/>
							</div>
						</div>
						
						<button className="ui primary fluid button" onClick={ sendEmail} type="submit">Send</button>
					</form>
					<div className="ui divider"></div>
					
				</div>
			</div>
			
		</form>
	</div>
</div>
  </div></div> 
  </div> </>)
}
export default  Resetpassword;