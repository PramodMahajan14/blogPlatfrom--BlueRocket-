import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/signup.css'
import '../css/profile.css'
import Modal from '../components/modal'
import pic3 from '../Images/pic3.svg'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
// import {updateAvatar} from '../redux/Action/blogAction';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TagInput } from 'evergreen-ui';

let myresponse;
let myres;
const Myprofile = ()=>{
    const [tags, setTags] = useState([
        'Tags',
        'Input'
      ]);
    const[loading,setloading] = useState(false)
    const[user,setuser] = useState({
		 username:'', phone:'',Profession:'',bio:''
	});
    const[message,setmessage] = useState(true);
	const[successmessage,setsuccessmessage] = useState(true);
    const[modals,setmodals] = useState(true)
    const[avatar,setavatar] = useState("")
 
    const userdata = useSelector((state)=>state.auser.ruserinfo);
    const Token = useSelector((state)=>state.tokenuser);

   
    const removeTag = (i) => {
        const newTags = [ ...tags ];
        newTags.splice(i, 1);
        setTags(newTags);
      };
    
      const inputKeyDown = (e,tagInput) => {
        const val = e.target.value;
        if (e.key === ' ' && val) {
          if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
            return;
          }
          setTags([...tags, val]);
          tagInput.value = null;
        } else if (e.key === 'Backspace' && !val) {
          removeTag(tags.length - 1);
        }
      };
console.log(tags)
// ===============================update-profile-picture======================================
    const update_profile = async(e)=>{
       
          const file = await e.target.files[0]
     try{
            if(!file) return myresponse="No files were uploaded.",setmessage(true)

            if(file.size > 1024 * 1024)
                return myresponse="Size too large.",setmessage(false)

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return myresponse="File format is incorrect.",setmessage(false)
              
            let formData =  new FormData()
            formData.append('file', file)
            console.log(formData)
            setloading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'accept': 'multipart/form-data', Authorization: Token}
            })
             setavatar(res.data.url)
            //  dispatch(updateAvatar(res.data.url))
            console.log(res)
            updatePic(res.data.url)
        }catch(err){
            myresponse = await  err;
            setmessage(false);
        }
    }

    
    //  ##############################Update-profilePic-################################
               const updatePic = async(avatar)=>{
                    
                try{
                        
                    const response = await axios.patch('/user/update', {avatar},{
                            headers: {Authorization: Token}
                        })
                        console.log(response)
                        setloading(false)
                        toast.success("Profile Picture Updated.Refresh Page",{position:'top-right'})
                        
                    }catch(err){
                        toast.error(err,{position:'top-right'});
                   }
               }

//================================================================================================= 
// =========================================update-profile-info=====================================

let name,value;
const userInput =(e)=>{
    name = e.target.name;
    value = e.target.value;
    setuser({...user,[name]:value})
}
  
	const UpdateUser = async(e)=>{
		e.preventDefault();
        const rootmail = userdata.email;
        try{    
                
		         const {username,phone,Profession,bio,skills} = user;  
            const response = await fetch('/user/update',{
				method:'PATCH',
				headers:{
					"Content-Type":"application/json",
                    "Authorization":Token
				},
				body:JSON.stringify({
				  username:username ? username:userdata.username,
                  phone:phone ? phone:userdata.phone,
                  Profession:Profession ? Profession:userdata.Profession,
                  bio:bio ? bio:userdata.bio,
                  skills : skills ? skills :userdata.skills,
                  rootmail
				})
			});

		
			const data = await response;
			 console.log(data)
			if(data.status === 200 ){
                toast.success("Your Profile Updated.",{position:'top-center'})
		    }else{
             toast.error("Try Again",{position:'top-right'})
		    }

		}catch(err){
			console.log(err);
			toast.error("Server problem",{position:'top-right'})
		}

	}
// ==================================================================================================
    const openmodal=()=>{
        if(modals === true){
            setmodals(false)
        }else{
            setmodals(true)
        }
    }
    const hidemessage=()=>{
        setmessage(true);
		setsuccessmessage(true)
    }
    return(<>
    {/* ================================================navbar================================================ */}

    <div className="navbar">
	<Link to={'/user'}> <span className="left_icon"><i className="arrow circle left icon"></i></span ></Link>
	</div>

    {/* ================================================background image=========================================== */}

    <div style={{backgroundImage:`url(${pic3})`, Width:'100%',opacity:"1.5",
              backgroundRepeat:'no-repeat',minHeight:'250px',backgroundPosition:'top',WebkitBackgroundSize:'cover',objectFit:'cover'}} ></div>
    {/* =========================================================================================================== */}
            {/* error message */}
            <div  className={message ? ' message ':'ui error message visible'}><i onClick={hidemessage} class="close icon"></i>{myresponse}</div>
        {/* ------ */}
        {/*success message */}
         <div  className={successmessage ? ' message ':'ui green message visible'}><i onClick={hidemessage} class="close icon"></i>
		 <div className="header">{myresponse}</div>
		 <p>{myres}</p>
		 </div>
    {/* ===================================================================================== */}
    { modals ?

    <div className="container emp-profile" id="user_profile">
            <form >
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img" id="user_img">
                            <img   src={userdata.avatar} alt="" id="user_imgsrc"/>
                            <div className="file btn btn-lg btn-primary" id="user_profile_btn" >
                              {loading ?
                                               <div class="spinner-border text-warning" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>:<span><i className="camera icon"></i></span>

                               }
                                <input  type="file" name="file"  onChange={update_profile}  accept="image/*" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <h5>
                                        {userdata.username}
                                    </h5>
                                    <h6>
                                        {userdata.Profession}
                                    </h6>
                                    <div className="d-flex justify-content-between align-items-center mt-4 px-4">
                                    <div className="stats">
                    <h6 className="mb-0" style={{color:'black'}}>Followers</h6> <span>8,797</span>
                </div>
                <div className="stats">
                    <h6 className="mb-0" style={{color:'black'}}>Following</h6> <span>142</span>
                </div>
                <div className="stats">
                    <h6 className="mb-0" style={{color:'black'}}>Total Rank</h6> <span>129</span>
                </div>
                </div>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <button  className="profile-edit-btn" onClick={openmodal}>Edite profile</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">
                            <p>WORK LINK</p>
                            <a href="">Website Link</a><br/>
                            <a href="">Bootsnipp Profile</a><br/>
                            <a href="">Bootply Profile</a>
                            <p>SKILLS</p>
                            <a href="">Web Designer</a><br/>
                            <a href="">Web Developer</a><br/>
                            <a href="">WordPress</a><br/>
                            <a href="">WooCommerce</a><br/>
                            <a href="">PHP, .Net</a><br/>
                           
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p style={{color:'black'}}>{userdata.userid}</p>
                                            </div>
                                            <div className="ui divider"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p style={{color:'black'}}>{userdata.username}</p>
                                            </div>
                                            <div className="ui divider"></div>
                                        </div>
                                        <div class="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p style={{color:'black'}}>{userdata.email}</p>
                                            </div>
                                            <div className="ui divider"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p style={{color:'black'}}>{userdata.phone}</p>
                                            </div>
                                            <div className="ui divider"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Profession</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p style={{color:'black'}}>{userdata.Profession}</p>
                                            </div>
                                            <div className="ui divider"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Bio</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p style={{color:'black'}}>{userdata.bio}</p>
                                            </div>
                                           
                                        </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </form>  <ToastContainer/>         
        </div>:<div className="closebtn">
                  {/* =========================================== Update form ============================================= */}
               
                  <div className="container contact_div" id="update_form" style={{zIndex:'99px'}}>
         <div className="row">
           <div className="col-md-6 col-10 mx-auto">
             <form>
             
             
             <div class="row">
			    				<div className="col-xs-6 col-sm-6 col-md-6">
			    					<div className="form-group">
                                    <label for="first_name" class="form-label">Name</label>
			                <input type="text" name="username" id="first_name" defaultValue={userdata.username} className="form-control input-sm"   onChange={userInput} />
			    					</div>
			    				</div>
			    				<div className="col-xs-6 col-sm-6 col-md-6">
			    					<div className="form-group">
                                    <label for="phone" className="form-label">Mobile</label>
			    						<input type="number" name="phone" id="phone" defaultValue={userdata.phone} className="form-control input-sm" 
                                             onChange={userInput}
                                        />
			    					</div>
			    				</div>
			    			</div>
                 <div className="mb-3">
                   <label for="exampleFormControlInput1" className="form-label">Profession</label>
                   <input type="text" class="form-control" name="Profession" defaultValue={userdata.Profession} id="exampleFormControlInput1" 
                      onChange={userInput}
                   />
                 </div>
                 <div className="mb-3">
                   <label for="exampleFormControlInput3" className="form-label">bio</label>
                   <textarea class="form-control" name="bio" defaultValue={userdata.bio} id="exampleFormControlInput3" 
                      onChange={userInput}
                   />
                 </div>
             
                 <div className="mb-3">
                   <label for="exampleFormControlInput2" className="form-label">Mail Id</label>
                   <input type="email" class="form-control" id="exampleFormControlInput2" defaultValue={userdata.email}  readOnly />
                 </div>
                 <div className="mb-3">
                 <div className="input-tag">
                   <ul className="input-tag__tags">
                         { tags.map((tag, i) => (
                        <li key={tag}>
                            {tag}
                          <button type="button" onClick={() => { removeTag(i); }}>+</button>
                       </li>
                        ))}
                      <li className="input-tag__tags__input"><input type="text" onKeyDown={inputKeyDown} /></li>
                     </ul>
                </div>
                  );
                  

                 </div>
                 
                 <div className="col-12">
    <button className="profile-edit-btn1" type="submit" onClick={UpdateUser}>Update</button><span> <button  className="profile-edit-btn2" onClick={openmodal}>cancel</button></span>
   
  </div>
             </form><ToastContainer/>  
           </div>
         </div>
       </div>
         {/* ============================================================================================================================================ */}






                 </div>}
       
  
    </>)
}
export default Myprofile;



