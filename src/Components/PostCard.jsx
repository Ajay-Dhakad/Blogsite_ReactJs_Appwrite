import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'
import parse from 'html-react-parser'

function PostCard({$id,title,featuredImage,content}) {
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
    <img  src={service.filePreview(featuredImage)} alt={title} />
</div>
<div className="titlepostcard">
<h2>{title}</h2>
{/* <p className='content-oncard' >{parse(truncateContent(content, 1))}</p> */}
</div>
</div>
    </Link>
  )
}

export default PostCard
