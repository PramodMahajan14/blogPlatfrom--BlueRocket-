import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from 'react';
import Slide from '@mui/material/Slide';
import { MdOutlineLeaderboard } from 'react-icons/md';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const SuccessMessage = (props)=>{
   const [success,setsccess] = useState(true);

    return(<>
        <Stack spacing={2} sx={{ width: '100%' }}>
           <Snackbar open={success} autoHideDuration={6000} onClose={()=>setsccess(false)}>
              <Alert onClose={()=>setsccess(false)} severity={props.messageType} sx={{ width: '100%' }}>
                   <h6>{props.Msg}</h6>
              </Alert>
            </Snackbar>
        </Stack>
    </>)
}

const ErrorMessage = (props)=>{
    const [error,seterror] = useState(true);
 
     return(<>
         <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={error} autoHideDuration={6000} onClose={()=>seterror(false)}>
               <Alert onClose={()=>seterror(false)} severity="error" sx={{ width: '100%' }}>
                    <h6>{props.Msg}</h6>
               </Alert>
             </Snackbar>
         </Stack>
     </>)
 }
export{SuccessMessage,ErrorMessage};