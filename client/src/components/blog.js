import React, { useState,useEffect,componentDidMount } from 'react';
import Card2 from './blogcard';
import "../css/home.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min"
import 'jquery/dist/jquery.min'

const muhj ="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60";



const Blog =()=>{

 
 


 
  const[menudish,setmenudish] = useState(false);
  const setpositionmenudish=()=>{
    if (window.innerWidth < 680 === true){
      if(window.scrollY >= 788){
        setmenudish(true);
      }else{
        setmenudish(false);
      }
    }
  }
  window.addEventListener('scroll',setpositionmenudish);
    return(<>

    {/* <div className="ui container" style={{margin:'2rem 0'}}>
      <div class="ui three column wide">
         <div>{props.card}</div>
      </div>
    </div>

 
  
<div className="ui divider"></div>
<div className="container">
  <div class="row" > */}
    {/* <div className="col-xs-12 col-sm-5" >
    <div className={menudish ? 'filterTrue active' : 'filterFalse'}>
    <b>{props.titlemenu}</b>
    <div style={{zIndex:"-99"}}  >
    <button class="ui red basic button" style={{margin:'4px'}}>All</button>
<button className="ui orange basic button" >politics</button>
<button className="ui yellow basic button">Sport</button>
<button className="ui olive basic button">place</button>
<button className="ui green basic button">person</button>
<button className="ui teal basic button">Productivity</button>
<button className="ui pink basic button">food</button>
<button className="ui brown basic button">Money</button>
<button className="ui grey basic button">Technology</button>
<button className="ui blue basic button" style={{margin:'4px'}}>Business</button>
</div></div>
 <div className="ui divider"></div>
    </div> */}
    {/* <TypeOfBlogs/>
    <div className="col-xs-12 col-sm-7" style={{overflow:"auto"}}>
      
     
        
       
   
         <Card2/>
      
       




    </div>
  </div>
</div> */}

  

          
<Card2/>




    </>)
}
export default Blog;
 
//=== Second TYpe Blog card===

{/* <div class="ui container" style={{display:'flex',minWidth:'70%'}}>
<div>
  <div class="image header" style={{display:'flex'}}><img  className="ui avatar image" src={muhj} alt="pic" />
    <div class="medium line">pramod434#00</div>
  </div>
  <div class="paragraph">
    <div class="full line"><h3 className="ui title">Earn Money Mining Ethereum Before It’s Too Late</h3></div>
    <div class="medium line">Ethereum mining is on its way out, but it’s not too late to partake</div>
    <div class="medium line">oct 12.<div className="ui label">Tcs</div></div>
  </div>
</div>
<img className="ui tiny image" style={{marginLeft:'1rem'}} src={muhj} pic="pic" />
</div> */}

//=== First TYpe Blog card===

{/* <div class="ui container">
  <div class="image header" style={{display:'flex'}}>
    <img  className="ui avatar image" src={muhj} alt="pic" />
   
    <div class="medium line">
        pramod@90<br/>
       <b className="title">Why is Java so dumb?</b>
     </div>
  </div>
  <div class="paragraph">
    <div class="full line">Ethereum mining is on its way out, but it’s not too late to partake...</div>
    <div class="medium line">oct 12.<div className="ui label">Tcs</div></div>
  </div>
</div> */}

/// layout

{/* <div class="container">
  <div class="row">
    <div className="col-xs-12 col-sm-9">
    <p>---------blogs----------</p>
     
    </div>

    <div className="col-xs-12 col-sm-3">
       <p>---------blogs menu----------</p>
     
    </div>
  </div>
</div> */}