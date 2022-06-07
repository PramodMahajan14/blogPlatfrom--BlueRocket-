import {ActionTypes} from "../contants/blogActionType";
import axios from 'axios'



export const loginuser =()=>{
   return{
     type:ActionTypes.LOGIN
   };
};

export const accesstoken=(token)=>{
  return{
    type:ActionTypes.GET_TOKEN,
    payload:token,
  }; 
};

export const rootinfo = async(token)=>{
     const res = await axios.get('/user/myprofile',{
       headers:{Authorization:token}
     });
    
     return res; 
};

export const  allinfo = async()=>{
  const res = await axios.get('/user/profile'
   )
  return res;
  // console.log(res)
}

export const rootinfoDetail =(res)=>{

  return{
    type:ActionTypes.GET_ROOTINFO,
    payload:{
      ruserinfo:res.data,
      rootuser:true
    },
  }; 
};


export const alluserinfo = (res)=>{
  return{
    type:ActionTypes.GET_ALL_USER_INFO,
    payload:{
      alluser:res.data
    },
  };
};

export const updateAvatar=(res)=>{
    return{
      type:ActionTypes.UPDATE_AVATAR,
      payload:{
        ruserinfo:res
      }
    }
  
}

export const getallpost=async()=>{
  const res = await axios.get("/user/getpost");
  return res.data;
}

export const setblogs = (blogs)=>{
  return{
      type:ActionTypes.SET_BLOGS,
      payload:blogs,
  };  
};

export const selectedblog = (blog)=>{
    return{
        type:ActionTypes.SELECTED_BLOG,
        payload:blog,
    };  
  };


  
export const closebutton =()=>{
    return{
      type:ActionTypes.SET_CLOSE,
      payload:{
        closebutton:true
      }
    };
 };

 