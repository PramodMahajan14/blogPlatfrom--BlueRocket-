import React, { useState } from 'react'
import './login_f.css'
import '../css/signup.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';

const logo = "https://api.freelogodesign.org/files/780354e018c34629a943c96c60bb0259/thumb/logo_200x200.png?v=637710899690000000";
let myresponse ;
let myres;
const SetNewPassword = ()=>{
    const[newpass,setnewpass] = useState({
		password:'',pass2:''
	});
    const {token} = useParams();
	
    const[message,setmessage] = useState(true);
	const[successmessage,setsuccessmessage] = useState(true);
	const hist = useHistory();
    let name,value;
	const handlepass=(e)=>{
		name = e.target.name;
        value = e.target.value;
        setnewpass({...newpass, [name]:value})
	}
	
    const Setpass = async(e)=>{
		e.preventDefault();
		const {password,pass2} = newpass;
     
			try{
                  
				if(password === pass2){
					const response = await axios.post('/user/reset', {password}, {
						headers: {Authorization: token}
					})
				    console.log(response)
					
					if(response.data.statuscode === 200){
                       myres = response.data.msg;
					   setsuccessmessage(false)
						hist.push('/signin')
				    }else{
					   myresponse = response.msg;
					   setmessage(false);
				    }
		   
			   }else{
				   myresponse = 'Miss match password';
				   setmessage(false);
			   }
			}catch(err){
              console.log(err);
			  myresponse = 'Server Problem';
			  setmessage(false);
			}
	
    }
      

    const hidemessage=()=>{
        setmessage(true);
    }
    return(<>
    <div className="navbar">
	<Link to={'/signin'}> <span className="left_icon"><i class="arrow circle left icon"></i></span ></Link>
	</div>

    <div  className={message ? ' message ':'ui error message visible'}><i onClick={hidemessage} class="close icon"></i>{myresponse}</div>
	<div  className={successmessage ? ' message ':'ui green message visible'}><i onClick={hidemessage} class="close icon"></i>
		 <p>{myres}</p>
		 </div>

                <div className="ui container form-page" style={{height:'100vh',width:'100%'}}>
	 <div className="ui middle aligned center aligned grid" style={{marginTop:'2rem'}}>
	<div className="column">
		<form className="ui form">
			<div className="ui segment">
				<h1><img src={logo} style={{height:'4rem'}}/></h1>
				<h3>Set New Password</h3>
			
				<div className="ui center aligned basic segment">
					<form className="ui form">
						<div className="field">
							<div className="ui left input">
								<input type="password" name="password" placeholder="New Password"
									value={newpass.password} onChange={handlepass}
								/>
							</div>
						</div>
						<div className="field">
							<div className="ui left input">
								<input type="password" name="pass2" placeholder="confirm Password"
									value={newpass.pass2} onChange={handlepass}
								/>
							</div>
						</div>
						<button className="ui primary fluid button" onClick={ Setpass} type="submit">New Password</button>
					</form>
					<div className="ui divider"></div>
					
				</div>
			</div>
			
		</form>
	</div>
</div>
  </div>

    </>)
}

export default SetNewPassword;