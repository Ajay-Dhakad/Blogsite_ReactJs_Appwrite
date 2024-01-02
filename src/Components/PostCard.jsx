import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'
import {useSelector} from 'react-redux'

function PostCard({$id,title,featuredImage,content,$createdAt,userId,postedby}) {
 var user = useSelector(state => state.auth.userData)
 
 const [postedbyself,setpostedbyself] = useState(false)
 

 useEffect(() => {
  if (user === userId ){

    setpostedbyself(true)
    
  
   }
 },[])



  const truncateContent = (content, numWords) => {
    if (content !== null) {
      return content.split(' ').slice(0, numWords).join(' ');
    }

    return ''; 
  };  


  return ( 
    <Link to={`/post/${$id}`}>

<div className='postcard'>

<div className='postimage'>
 <img  src={service.filePreview( featuredImage)} alt={title} />
</div>
<div className="titlepostcard">
<h2>{title}</h2>
{/* <p className='content-oncard' >{parse(truncateContent(content, 1))}</p> */}
</div>
<div className={`postdateoncard ${postedbyself && 'red'}` } ><p>Posted on : {$createdAt.slice(0,10).split('-').reverse().join('-')} {postedbyself ? 'By You':'by '+ postedby}</p></div>
</div>
    </Link>
  )
}

export default PostCard
