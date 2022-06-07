import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import '../../node_modules/semantic-ui-css'
// import { useHistory } from 'react-router';
import '../css/signup.css';
import { useHistory } from 'react-router';
import {useDispatch,useSelector} from 'react-redux'


const logo = "https://api.freelogodesign.org/files/780354e018c34629a943c96c60bb0259/thumb/logo_200x200.png?v=637710899690000000";
let myresponse;
let myres;
const Modal =()=>{
    const olddata = useSelector((state)=>state.auser.ruserinfo)
 const hist = useHistory();	

	const[message,setmessage] = useState(true);
	const[successmessage,setsuccessmessage] = useState(true);
    
    const[newuser,setnewuser] = useState({
		userid:'', username:'', email:'', password:''
	});
	
    let name,value;
    const userInput =(e)=>{
        name = e.target.name;
        value = e.target.value;
        setnewuser({...newuser,[name]:value})
    }
	
    // console.log(olddata)
	const UpdateUser = async(e)=>{
		e.preventDefault();
		
		const {userid,username,email,password} = newuser;
		try{

            const response = await fetch('/user/update',{
				method:'POST',
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					userid,username,email,password
				})
			});
		
			const data = await response.json();
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
	const closefun=()=>{
   
	  window.history.back()

	}
 return(<>
	
        {/* error message */}
          <div  className={message ? ' message ':'ui error message visible'}><i onClick={hidemessage} className="close icon"></i>{myresponse}</div>
        {/* ------ */}
        {/*success message */}
         <div  className={successmessage ? ' message ':'ui green message visible'}><i onClick={hidemessage} className="close icon"></i>
		 <div className="header">{myresponse}</div>
		 <p>{myres}</p>
		 </div>
        {/* ------ */}
{/* ==========================================form=============================================================== */}
		<div className="ui middle aligned center aligned grid">
	    <div className="column">
		     <form className="ui form">
			    <div className="ui segment">
				    <h1><img src={logo} style={{height:'4rem'}}/></h1>
			        <h2>Create your account</h2>
				    <div className="ui center aligned basic segment">
					    <form className="ui form" method='' >
						    <div className="field">
							    <div className="ui left input">
								    <input type="text" name="userid" defaultValue={olddata.userid} 
                                      value={newuser.userid} onChange={userInput}
                                    />
							    </div>
						    </div>
						    <div className="field">
							    <div className="ui left input">
								    <input type="text" name="username" placeholder="Enter  name"
                                      value={newuser.username} onChange={userInput}
                                    />
							    </div>
						    </div> 
						   <div className="field">
							    <div className="ui left input">
								    <input type="text" name="email" placeholder="Email adress"
                                      value={newuser.email} onChange={userInput}
                                    />
							    </div>
						    </div>
						    <div className="field">
							    <div className="ui left input">
								       <input type="password" name="password" placeholder="Password"
                                          value={newuser.password} onChange={userInput}
                                       />
							    </div>
						    </div>
						   <button className="ui primary fluid button" type="submit" onClick={UpdateUser}>Update</button>
						   <button className="ui negative fluid button"  onClick={closefun}>close</button>
					   </form>
					     
                    
					   
				   </div>
			</div>
			
		</form>
	</div>
</div>

  
	
	

    </>)
}

export default Modal;