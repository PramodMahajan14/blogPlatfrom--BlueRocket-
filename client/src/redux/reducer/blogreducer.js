import { ActionTypes} from "../contants/blogActionType";


const userStatus ={
    ruserinfo:[],
    alluser:[],
    isLogged:false,
    rootuser:false,
    closebutton:false,
    
}
export const user =(state=userStatus,action)=>{
    switch(action.type){
        case ActionTypes.LOGIN:
            return {...state,isLogged:true}
        case ActionTypes.GET_ROOTINFO:
            return{...state,
                 ruserinfo:action.payload.ruserinfo,
                 rootuser:action.payload.rootuser
                }  
        case ActionTypes.UPDATE_AVATAR:
    
            return{...state.ruserinfo,avatar:action.payload.ruserinfo
                  
                  }         
        case ActionTypes.SET_CLOSE:
            return {...state,closebutton:true}  
            
        case ActionTypes.GET_ALL_USER_INFO:
            return{...state,alluser:action.payload.alluser} 
               
        default:
            return state;    
    }
}

const token=''
export const tokenReducers = (state = token,action)=>{
     switch(action.type){
                 case ActionTypes.GET_TOKEN:
                                    return action.payload
                 default: return state
     }
}

const inlitialState={
    blogs:[]
};
export const blogsReducers =(state=inlitialState,{type,payload})=>{
    switch (type){
        case ActionTypes.SET_BLOGS:
            return {...state,blogs:payload};
        default:
            return state;    
    }
};

const blogselect={
    rblogs:[]
}
export const selectedblogReducers = (state=blogselect,{type,payload})=>{
    switch (type){
        case ActionTypes.SELECTED_BLOG:
            return {...state,...payload};
        default:
            return state;    
    }
};