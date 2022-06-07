import React, { useState } from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom'
import '../css/Nav2css.css';
import Menu from './Menu';
const homelogo = "https://api.freelogodesign.org/files/780354e018c34629a943c96c60bb0259/thumb/logo_200x200.png?v=637710891830000000";
const Nav2 =()=>{
   const hist = useHistory();
   const homepage=()=>{
       hist.push('/user')
   }
   
    return(<>
        <div className="secondNav">
            <a className="ele"><Menu/></a>
            <p className='home_logo'><img src={homelogo} onClick={homepage}  style={{width:'4rem',textAlign:'left',justifySelf:'flex-start'}} /></p>
        </div>
    </>)
}
export default Nav2;

{/* <div class="ui icon top left pointing dropdown button">
<img class="ui avatar image" src="https://avatars.githubusercontent.com/u/87180411?v=4"/>
   <div className="menu">
       <div class="header">pramodmahajan1411200@gmail.com</div>
       <div class="ui divider"></div>
       <div class="item">Create Blog</div>
       <div class="item">List</div>
       <div class="item">profile</div>
       <div class="item">logout</div>
   </div>
</div> */}