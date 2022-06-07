import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import '../../node_modules/semantic-ui-css'
// import { useHistory } from 'react-router';
// import '../css/signup.css';
import './login_f.css';
import StrongPassword from "../components/StrongPassword";
import validator from "validator";
import Footer from '../components/footer';

const logo = "https://api.freelogodesign.org/files/780354e018c34629a943c96c60bb0259/thumb/logo_200x200.png?v=637710899690000000";
let myresponse;
let myres;

const SignUp =()=>{
	document.title="Create New Account"
	const[message,setmessage] = useState(true);
	const[loading,setloading] = useState(false)
	const[validPass,setvalidPass] = useState(false);
	const[successmessage,setsuccessmessage] = useState(true);
    const[user,setuser] = useState({
		userid:'', username:'', email:'', password:''
	});
	
    let name,value;
    const userInput =(e)=>{
        name = e.target.name;
        value = e.target.value;
        setuser({...user,[name]:value});
          setvalidPass(true);                              

    }
	const validate = (value) => {
  
		if (validator.isStrongPassword(value, {
		  minLength: 8, minLowercase: 1,
		  minUppercase: 1, minNumbers: 1, minSymbols: 1
		})) {
		  alert('Is Strong Password')
		} else {
		  alert('Is Not Strong Password')
		}
	}
	
	const SignupUser = async(e)=>{
	    setloading(true)
		e.preventDefault();
		
		const {userid,username,email,password} = user;
		try{

            const response = await fetch('/user/register',{
				method:'POST',
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					userid,username,email,password
				})
			});
		
			const data = await response.json();
			setloading(false)
			// console.log(data);
			 myresponse = data.msg;
             myres  = data.msg1;
			if(data.statuscode === 200 ){
				setsuccessmessage(false);
				// toast.success(data.msg,{position:toast.POSITION.TOP_CENTER})
				
		   }else{
			   myresponse = data.msg;
			   // toast.error(data.msg,{position:toast.POSITION.TOP_CENTER})
			   setmessage(false);
		   }

		}catch(err){
			console.log(err);
			myresponse = err;
		}

	}
	const hidemessage=()=>{
        setmessage(true);
		setsuccessmessage(true)
    }

	const load =()=>{
		return(<>
			<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
		<span class="visually-hidden">Loading...</span>
		</>)
	}
	
 return(<>
 <div style={{width:'100%',height:'100vh'}}>
	<div className="navbar">
	<Link to={'/'}> <span className="left_icon"><i class="arrow circle left icon"></i></span ></Link>
	<h2 className="ui right floated header">BlueRocket</h2>
	</div>
	

        {/* error message */}
          <div  className={message ? ' message ':'ui error message visible'}><i onClick={hidemessage} class="close icon"></i>{myresponse}</div>
        {/* ------ */}
        {/*success message */}
         <div  className={successmessage ? ' message ':'ui green message visible'}><i onClick={hidemessage} class="close icon"></i>
		 <div className="header">{myresponse}</div>
		 <p>{myres}</p>
		 </div>
        {/* ------ */}

{/* ==========================================form=============================================================== */}
           
		<div className="container" id="regist_form">
	   
		     <form className="ui form" id="sinup">
			    <div className="ui segment">
				    <div className="ui center aligned basic segment">
					    <form className="ui form" method='' >
						<div className="field">
                          <div className="ui center float">
                          <h1><img src={logo} className="logo_img1" style={{height:'4rem'}}/></h1>
              <h2>Create your account</h2>
                          </div>
                      </div> 
						    <div className="field">
							    <div className="ui left input">
								    <input type="text" name="userid" placeholder="User id eg.jon_@22"
                                      value={user.userid} onChange={userInput}
                                    />
							    </div>
						    </div>
						    <div className="field">
							    <div className="ui left input">
								    <input type="text" name="username" placeholder="Enter  name"
                                      value={user.username} onChange={userInput}
                                    />
							    </div>
						    </div> 
						   <div className="field">
							    <div className="ui left input">
								    <input type="text" name="email" placeholder="Email adress"
                                      value={user.email} onChange={userInput}
                                    />
							    </div>
						    </div>
						    <div className="field">
							    <div className="ui left input">
								       <input type="password" name="password" placeholder="Password"
                                          value={user.password} onChange={userInput} 
                                       />
							    </div>
								{validPass && <StrongPassword password={user.password}/>}
						    </div>
						   <button className="ui primary fluid button" type="button" onClick={SignupUser}  >
						  {loading ? <div><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
		                   <span > Loading...</span></div>:<span>Submit</span>
						  }
						   </button>
    
					   </form>
					      <h4 className="ui horizontal divider header" id="divi">OR</h4>
						  New here? <Link to={'/signin'}><a href="#">Sign Up</a></Link>
					   
				   </div>
			</div>
			
		</form>
	
	
</div>

  
	<Footer/>
	</div>

    </>)
}
export default SignUp;