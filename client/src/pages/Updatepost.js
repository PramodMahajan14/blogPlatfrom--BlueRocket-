
import React,{useState} from 'react';
import Nav2 from '../components/Nav2';
import Blog from '../components/blog';
import '../../node_modules/semantic-ui-css'

import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import '../css/createb.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { useSelector } from 'react-redux';
import {useHistory,useParams} from 'react-router'

const UpdatePost =()=>{
const userdata = useSelector((state)=>state.auser.ruserinfo);
const blogs = useSelector((state)=>state.allblogs.blogs);
const {purl} = useParams();
const selectblog = blogs.find((item)=>item.purl===purl);
  const Token = useSelector((state)=>state.tokenuser);
  const [value, setValue] = useState(selectblog.body);
  const[pic,setpic] = useState("Change Image");
  const[picurl,setpicurl] = useState('');
  const[ptitle,setptitle] = useState('')
  const[posturl,setposturl] = useState('');
  const[posttype,setposttype] =useState('');
  const[post_desc,setpost_desc] =useState('');
  const[imgsrc,setimgsrc] = useState('');
  const[load,setlod] = useState(false);
  const[loading,setloading] = useState(false)
  const hist = useHistory();


  const purlhandle =e=>{
    setptitle(e.target.value);
    const new_posturl = e.target.value.trim().toLowerCase().split(' ').join('+');
    setposturl(new_posturl);
  }


  const imagehandle =async(e)=>{
    setlod(true)
    if(!Token) return toast.error("please login",{position:'top-right'}),setlod(false)
    setpic(e.target.files[0].name);
    const reader = new FileReader();
    reader.onloadend=()=>{
      setpicurl(reader.result)
    }
    reader.readAsDataURL(e.target.files[0])
    const file = await e.target.files[0];
  
    try{
      if(!file) 
         return toast.error("No files were uploaded.",{position:'bottom-left'})

      if(file.type !== 'image/jpeg' && file.type !== 'image/png')
          return toast.error("File format is incorrect.",{position:'bottom-left'})
        
      let formData2 =  new FormData()
      formData2.append('file', file)
      console.log(formData2)
      const res = await axios.post('/api/upload_image', formData2, {
          headers: {'accept': 'multipart/form-data', Authorization: Token}
      })
      setimgsrc(res.data.url)
      if(res.status == 200){
        setlod(false)
      }
     
    }catch(e){
      console.log(e)
      toast.error("Try Again",{position:'bottom-left'})
      setlod(false);
      hist.push('/user')
    }
  }
  
 
  const ptyl = "+";
  const[post, setpost] =useState({
    title:'',body:'',image:'',description:'',ptype:'',purl:posturl,user_id:userdata.userid, user_avatar:userdata.avatar
  })
  
  const submitPost =async(e)=>{
    setloading(true);
    if(!Token) return toast.error("Please Login first",{position:'bottom-left'}),setloading(false);
    e.preventDefault();
    post.title = ptitle;
    post.ptype =posttype 
    post.purl = post.user_id+ptyl+posturl;
    post.description = post_desc;
    post.image = imgsrc;
    post.body = value;
     let id = selectblog._id;
    const{title,body,image,description,purl,ptype} = post;
    try{
              
      const response = await fetch('/user/update_post',{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id,
            title:title ? title:selectblog.title,
            body:body ? body:selectblog.body,
            image:image ? image:selectblog.image,
            description : description ? description:selectblog.description,
            purl : purl ? purl:selectblog.purl,
            ptype : ptype ? ptype:selectblog.ptype
        })
      });
      console.log(response)
      const data = response.json();
      
     if(response.status == 200){
      toast.success("Your post successfully Update.",{position:'top-center'});
      setloading(false)
     }
      

    } catch(err){
      console.log(err)
      setloading(false)
    }
  }
 
  
    return(<>

<Nav2/>
       <div className='container' style={{marginTop:'1rem'}}>
       <form className='ui form'>
        <div className='row' style={{textAlign:'center',fontWeight:'bold',fontStyle:'italic'}}>
          <div className='col-12'>
            <div className='card' style={{height:'4rem'}}>
              <h3 className='card_h3'>Update post</h3>
            </div>
          </div>
        </div>
         <div className='row' style={{marginTop:'3px'}}>
            <div className="col-xs-12 col-sm-8">
              <div className='card'>
                  <div className='group'>
                    <label htmlFor='title'>Post Title<sup>*</sup></label>
                    <input
                     type="text" 
                     name="title" id="title" 
                       className='group__control' placeholder='Post title...'
                       defaultValue={selectblog.title}
                        onChange={purlhandle} 
                     />
                  </div>
                  <div className='group'>
                    <label htmlFor='image' className='image__label'>{pic}{load ? <div style={{float:'right'}} class="spinner-border text-danger" role="status">
  <span class="sr-only"></span>
</div>:''}</label>
                    <input
                     type="file" 
                     name="image" id="image"
                   Value={selectblog.image}
                     onChange={imagehandle}
                     />
                       
                  </div>
                  <div className='group'>
                    <label htmlFor='Body'>Body<sup>*</sup></label>
                    <ReactQuill theme='snow' Value={value} onChange={setValue}
                     id="body" 
                      defaultValue={selectblog.body}
                     
                      />
                  </div>
                  <div className='group'>
                    <label htmlFor='posttype'>Post Type<sup>*</sup></label>
                    <select className='group__controle' id="posttype" name="ptype" defaultValue={selectblog.ptype} onChange={(e)=>setposttype(e.target.value)}>
                      <option value="">--Select category--</option>
                      <option value="politics">Politics</option>
                      <option value="sport">Sport</option>
                      <option value="place">Place</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="food">Food</option>
                      <option value="technology">Technology</option>
                      <option value="Health&fitness">Health and fitness</option>
                      <option value="fashion&beauty">Fashion and beauty</option>
                      <option value="person">Person</option>
                      <option value="all">other</option>
                    </select>
                  </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-4">
               <div className='card'>
                 <div className='group'>
                   <label htmlFor='post-url'>Post Url</label>
                   <input type="text" name="posturl"
                     id="post-url" 
                     defaultValue={selectblog.posturl}
                     className='group__control' 
                     placeholder='Post Url...'
                     disabled
                   />
                 </div>
                 <div className='group'>
                   <div className='postimage'>
                     {picurl ? <img src={picurl} />: ""}
                   </div>
                 </div>
                 <div className='group'>
                  <label htmlFor='description'>Description<sup>*</sup></label>
                   <textarea  id="description"
                      cols="13" rows="6"
                      name='post_desc'
                      defaultValue={selectblog.description} onChange={(e)=>setpost_desc(e.target.value)}
                     className='group__controle'> 
                    </textarea>
                 </div>
               </div>
            </div>
         </div>
         <div className='row' style={{marginTop:'4px'}}>
          <div className='col-12'>
            <div className='card' >
              <button className="btn btn-primary btn-lg" onClick={submitPost}>
              {loading ? <div><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
		                   <span > Loading...</span></div>:<span>Submit</span>
						  }
              </button>
           
            </div>
          </div>
        </div>
         </form><ToastContainer/>  
       </div>
      

    </>)
}
export default UpdatePost