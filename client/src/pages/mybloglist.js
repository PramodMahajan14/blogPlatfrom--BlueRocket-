import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight} from "react-icons/ai";
import { useSelector,useDispatch } from 'react-redux';
import { selectedblog ,setblogs} from '../redux/Action/blogAction';
import { mydate } from '../components/date';
import Empty from '../components/empty';
import Nav2 from '../components/Nav2';
import '../css/bloglist.scss'
import { FiMoreVertical ,FiTrash2, FiEdit3} from "react-icons/fi";
// import { Pane, Dialog } from 'evergreen-ui'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { MdDelete } from "react-icons/md";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Myblog from './bloglist';
import {SuccessMessage,ErrorMessage} from '../components/Message';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

var message;
const MyBlogList =()=>{
  const Token =  useSelector((state)=>state.tokenuser)
  const rootuser = useSelector((state)=>state.auser.ruserinfo);
  const blogs = useSelector((state)=>state.allblogs.blogs);
  const myblogs = useSelector((state)=>state.blog.rblogs);


  const [anchorEl, setAnchorEl] = useState(null);
  const[title,settitle] = useState()
  const [open, setOpen] = useState(false);
  const [deleted, setdeleted] = useState(false);
  const [isNotDeleted, setNotDeleted] = useState(false);
  const hist  = useHistory()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  const Blogs=async()=>{
    try{
       const res = await axios.get("/user/getpost");
       dispatch(setblogs(res.data))
    }catch(err){
      console.log(err)
    }
  } 

  useEffect(()=>{
     Blogs();
  },[])

 
  
   

  var getpost= blogs.filter(function (el){
        return el.user_id == rootuser.userid;
  })
  
  dispatch(selectedblog(getpost))

  const opens = Boolean(anchorEl);
  const handleClick =val=>event => {
    settitle(val);
    setAnchorEl(event.currentTarget);
  };
  
  const deleteblog =()=>{
    setAnchorEl(false)
    setOpen(true)
   
  }
  
  const Deletepost=async()=>{
     setOpen(false)
     console.log(title)
     try{
      const response = await fetch('/user/delete_post',{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          title
        })
      });
      console.log(response)
      if(response.status === 200){
          message = "post is Deleted"
        setdeleted(true);
      }
     }catch(err){
         message = "post is not deleted"
      setNotDeleted(true)
     }
  }
 

 const update =(p)=>{
    //  hist.push(`/mybloglist/${p}`)
    console.log(p);
 }

    return(<>
     <Nav2/>
   
 
  {Object.keys(getpost).length === 0? <Empty/> :   

   

   
        getpost.map((item)=>{
    const {_id,title,purl,ptype,image,description,date} = item;
       return(<>
      <div class="blog-card" >
         <div class="meta" key={_id}>
           <div class="photo" style={{backgroundImage:`url(${image})`}}></div>
               <ul class="details">
                 <li class="author"><a href="#">{rootuser.username}</a></li>
                 <li class="date">{mydate(date.substring(5,7))} {date.substring(8,10)}</li>
               </ul>
          </div>
           <div class="description">
              <div className='delete_edite'><button  value={title} onChange={(e)=>settitle(e.target.value)} onClick={(e)=>handleClick(title)(e)}><FiMoreVertical/></button>
              <Menu
                     id="demo-positioned-menu"
                     aria-labelledby="demo-positioned-button"
                     anchorEl={anchorEl}
                     open={opens}
                     onClose={()=>setAnchorEl(null)}
                     anchorOrigin={{
                       vertical: 'top',
                       horizontal: 'left',
                     }}
                     transformOrigin={{
                       vertical: 'top',
                       horizontal: 'left',
                     }}
                >
                <MenuItem onClick={deleteblog}><FiTrash2/>.Delete</MenuItem>
                <MenuItem ><Link to={`/mybloglist/${purl}`}><FiEdit3/>.Edit</Link></MenuItem>
              </Menu>
            
             </div>
                  <h1>{title}</h1>
                  <h2>{description.substring(0,30)}...</h2>
                  <p> {description.substring(23,50)}</p>
                  <p class="read-more">
                   <Link to={`/user/${purl}` } > <a href="#" >Read More</a></Link>
                  </p>
             </div>
    </div>
    
    </> )
     
    }) 
   
  }
 
  <Dialog
     open={open}
     TransitionComponent={Transition}
     keepMounted
     onClose={()=>  setAnchorEl(null)}
     aria-describedby="alert-dialog-slide-description"
  >
  <DialogTitle>{title}</DialogTitle>
     <DialogContent>
       <DialogContentText id="alert-dialog-slide-description">
       Are you sure you want to delete this post
       </DialogContentText>
     </DialogContent>
     <DialogActions>
     <Button variant="outlined" color="error" onClick={()=>setOpen(false)}>Cancle</Button>
     <Button variant="outlined" startIcon={<MdDelete />} onClick={Deletepost}>Delete</Button>
     </DialogActions>
   </Dialog>
   
  

   {isNotDeleted && <ErrorMessage Msg={message}/>} 
   {deleted && <SuccessMessage Msg={message} messageType="success" />}

    </>)

    }
export default MyBlogList;
