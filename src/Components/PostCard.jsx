import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'
import parse from 'html-react-parser'

function PostCard({$id,title,featuredImage,content}) {
  const truncateContent = (content, numWords) =>
  content.split(' ').slice(0, numWords).join(' ');    
  return ( 
    <Link to={`/post/${$id}`}>

<div className='postcard'>

<div className='postimage'>
    <img  src={service.filePreview(featuredImage)} alt={title} />
</div>
<h2>{title}</h2>
<p className='content-oncard' >{parse(truncateContent(content, 3) +'&nbsp......')}</p>

</div>
    </Link>
  )
}

export default PostCard
