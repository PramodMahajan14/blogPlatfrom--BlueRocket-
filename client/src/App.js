
import React,{Suspense, lazy, useDebugValue, useEffect, useState} from "react"
import '../node_modules/semantic-ui-css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/Home";
import Newblog from "./pages/createBlog";
import User from "./pages/user";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Resetpassword from "./pages/resetpassword";
import Authenticated from "./pages/activate";
import Myprofile from './pages/profile'
import SetNewPassword from "./pages/reset";
import BlogView from './pages/blogview';
import Myblog from "./pages/bloglist";
import Error from "./pages/Error";
import MyBlogList from "./pages/mybloglist";
import UpdatePost from "./pages/Updatepost";
function App() {
  
 
  return (
    <>
   
     <Router>
   
     <Switch>

        <Route path="/"   exact component={Home}/>
        <Route path="/user"   exact component={User}/>
        <Route path="/user/profile"   exact component={Myprofile}/>
        <Route path="/mybloglist"   exact component={MyBlogList}/>
        <Route path="/mybloglist/:purl"   exact component={UpdatePost}/>
        <Route path="/user/:purl"   exact component={BlogView}/>
        <Route path="/user/activate/:activation_token"   exact component={Authenticated}/>
        <Route path="/createblog" exact component={Newblog}/>
        <Route path="/signin" exact component={SignIn}/>
        <Route path="/signin/resetpassword" exact component={Resetpassword}/>
        <Route path="/user/reset/:token" exact component={SetNewPassword}/>
        <Route path="/signup" exact component={SignUp}/>

        <Route><Error/></Route>
     </Switch>
    
     </Router>
     
    
    </>
  )
}

export default App