import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../Components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loader,setLoader] = useState(true)

    useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
        setLoader(true)
        if (posts) {
            setPosts(posts.documents)
            // console.log(posts)
            setLoader(false)
        }
    })
},[])


    if (loader) return <div className="loadercomponent"> <span className="loader"></span></div>


  return (
    
        <Container>
            <div className="postcontainer">
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                        {console.log(post)}
                    </div>
                    
                ))}
                </div>
            </Container>
   
  )
}

export default AllPosts