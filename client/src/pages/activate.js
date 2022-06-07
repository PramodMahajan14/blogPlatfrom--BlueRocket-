import React, { useEffect ,useState} from 'react';
import '../../node_modules/semantic-ui-css'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/error.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import success from "../Images/success.png"
import error from '../Images/error.png';




let myresponse;
let myres;
const Authenticated =()=>{
    const[message,setmessage] = useState(true);
	const hist = useHistory();
    const{activation_token} = useParams();

   
   
     useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activation', {activation_token})
                    console.log(res);
                     if(res.status === 200){
                      myres =  res.data.msg; 
                        setmessage(false);
                     }else{
                       
                        setmessage(true);
                     }
                } catch (err) {
                    // console.log(err.request)
                if(err.request.status === 400){
                    myresponse = "This Email has already been taken";
                    setmessage(true);
                }else{
                    myresponse = "This Token has been Expired";
                    setmessage(true);
                }
               
                }
            }
            activationEmail()
        }
    },[activation_token])
   
   const successful =(<>
        <div className='ui container' style={{width:"100%",textAlign:'center',margin:'80px'}}>
              <img src={success} style={{width:'200px',height:'200px'}}/>
              <h1 className="succesmsg">Congratulations!</h1>
              <p >{myres}!</p>
              <button className="green" onClick={()=>hist.push('/signin')}>Continue</button>
          </div>
   </>)
   const Error =(<>
    <div className='ui container' style={{width:"100%",textAlign:'center',margin:'80px'}}>
          <img src={error} style={{width:'200px',height:'200px'}}/>
          <h1 className="succesmsg">Sorry!</h1>
          <p>This Token has been Expired.</p>
          <button className="green"  onClick={()=>hist.push('/signup')}>Back</button>
      </div>
</>)
   
    return(<>
    <div style={{height:"100vh"}}>
        <div className="navbar">
	<Link to={'/'}> <span className="left_icon"><i class="arrow circle left icon"></i></span ></Link>
	<h2 className="ui right floated header">BlueRocket</h2>
	</div>
         {
             message ? Error :successful
         }
 
         {/* <div  className={successmessage ? ' message ':'ui container visible'} >
           <img src={success}/>
		 </div>  */}
    </div>
   </>)
}
export default Authenticated;