import React from 'react'
import '../css/empty.scss'
import {  useHistory, useParams } from 'react-router-dom'

const Empty = ()=>{
    const hist = useHistory();
    return(<>
        <div class="empty_state">
 <img src="https://media.istockphoto.com/vectors/tired-cat-vector-id579257282?k=20&m=579257282&s=612x612&w=0&h=eN_b3pi1EZgyHHPcr-upe_yieF4hAnmITPtZS7Hc8Jo="/>
  <h3 class="">No posts</h3>
  <p>There have been no posts in this section yet</p>
  <button onClick={()=>hist.push('/createblog')}>create post</button>
</div>
    </>)
}
export default Empty;