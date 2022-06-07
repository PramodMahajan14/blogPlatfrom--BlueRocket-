import React, { useEffect, useState } from 'react'
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
import { Link } from 'react-router-dom';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Myblog = ({S_open,E_open},props)=>{
  
  const [open, setOpen] = useState(false);
  const [deleted, setdeleted] = useState(false);
  const [isNotDeleted, setNotDeleted] = useState(false);
  const dispatch = useDispatch();

  const Blogs=async()=>{
    try{
       const res = await axios.get("/user/getpost");
       dispatch(setblogs(res.data))
    }catch(err){
      console.log(err)
    }
  }
  
  

  

  return(<>
   
   <Stack spacing={2} sx={{ width: '100%' }}>
   <Snackbar open={open} autoHideDuration={6000} onClose={()=>setOpen}>
   <Alert onClose={setdeleted(false)} severity="success" sx={{ width: '100%' }}>
      hhhh
    </Alert>
   <Alert onClose={()=>setNotDeleted(false)} severity="error" sx={{ width: '100%' }}>
       jjjj
   </Alert>
</Snackbar>
</Stack>

   </>)
}
export default Myblog;

