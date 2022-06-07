import React, { useEffect } from "react";
import '../../node_modules/semantic-ui-css'
import Nav from "../components/Nav";
import '../css/home.css';
import Blog from "../components/blog";
import Card2 from "../components/blogcard"
import Fblogcard from "../components/Fblogcard";
import { useHistory } from 'react-router';
import {useSelector} from "react-redux";
import { setblogs,allinfo,alluserinfo,getallpost } from "../redux/Action/blogAction";
import axios from "axios";
import { useDispatch } from "react-redux";
import Footer from "../components/footer";


const image = "https://images.unsplash.com/photo-1579273166674-bea9b40ba0f7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGljdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60";
const Home =()=>{

  const userdata = useSelector((state)=>state.auser.ruserinfo);
  const Homekey = useSelector((state)=>state.auser.isLogged);
  const dispatch = useDispatch();
  const hist = useHistory();
   const showORnot=()=>{
     if(Homekey === true) hist.push('/user')
   }
   const getting_users_data=async()=>{
     const res =  await  allinfo();
      dispatch(alluserinfo(res));
   }
   const getting_all_blog=async()=>{
     const res = await getallpost();
     dispatch(setblogs(res))
   }
   useEffect(()=>{
    //  blogs();
     showORnot();
     getting_users_data();
     getting_all_blog();
   })

  if(userdata !== null) document.title="WelCome to BlueRocket"
  
    return(<>
    
  <div >
  <Nav/>
  </div>
  
  <Card2
  
    titlemenu="DISCOVER MORE OF WHAT MATTERS TO YOU"
  />
       
 <Footer/>
    </>);
};
export default Home;