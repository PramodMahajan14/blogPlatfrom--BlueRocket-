import React, { useEffect } from 'react'
import { Pane, Badge, Text } from 'evergreen-ui';
import { useSelector } from 'react-redux';
import { selectedblog, setblogs } from '../redux/Action/blogAction';
import { useDispatch } from "react-redux";
import axios from "axios";
import { mydate } from './date';
const muhj ="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60";
const Fblogcard = ()=>{
  const blogs = useSelector((state)=>state.allblogs.blogs)
  const Token =  useSelector((state)=>state.tokenuser)
  const rootuser = useSelector((state)=>state.auser.ruserinfo);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    Blogs();
  });
  const Blogs=async()=>{
    try{
       const res = await axios.get("/user/getpost");
       dispatch(setblogs(res.data))
    }catch(err){
      console.log(err)
    }
  }
 
     const blogcard= blogs.map((item)=>{
        const {_id,title,body,purl,ptype,image,user_avatar,user_id,description,date} = item;
          console.log(_id)
          
       return(
        <div className='container'>
        
        <div className="cols">
         <div className='container'>
        <div className="image header" style={{display:'flex'}}>
          <img  className="ui avatar image" src={user_avatar} alt="pic" />
         
          <div className="medium line" key={_id}>
              {user_id}<br/>
             <b className="title">{title}</b>
           </div>
        </div>
        <div className="paragraph">
        <div className="full line">{description.substring(0,60)}...</div>
        <Pane> <Badge color="green" marginRight={8}>{mydate(date.substring(5,7))}  {date.substring(8,10)}</Badge><Badge color="teal" marginRight={8}>{ptype}</Badge> </Pane>
        </div>
        </div>
        </div>
        </div>
      
     
       );
     })




    return(<>
     {blogcard}
 



{/* <div className='cols-sm-4'>
  <div className="image header" style={{display:'flex'}}>
    <img  className="ui avatar image" src={muhj} alt="pic" />
   
    <div className="medium line">
        pramod@90<br/>
       <b className="title">Why is Java so dumb?</b>
     </div>
  </div>
  <div className="paragraph">
  <div className="full line">Ethereum mining is on its way out, but it’s not too late to partake...</div>
  <Pane> <Badge color="green" marginRight={8}>Oct 2.</Badge><Badge color="teal" marginRight={8}>Progamming</Badge> </Pane>
  </div>
  </div> */}
    </>)
}
export default Fblogcard;


