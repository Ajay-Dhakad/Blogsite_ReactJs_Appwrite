import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'
import {parse} from 'html-react-parser'

function PostCard({$id,title,featuredImage,content}) {
  return (
    <Link to={`/post/${$id}`}>

<div className='postcard'>

<div className='postimage'>
    <img  src={service.filePreview(featuredImage)} alt={title} />
</div>
<h2>{title}</h2>
<p>{parse(content)}</p>

</div>
    </Link>
  )
}

export default PostCard
