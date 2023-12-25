import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../Components'

function Home() {
    const [posts, setPosts] = useState([])
    const [loader,setLoader] = useState(true)


    useEffect(() => {
        setLoader(true)
        appwriteService.getPosts().then((posts) => {
            console.log(posts)

            if (posts) {
                setPosts(posts.documents)
                setLoader(false)
            }
            else{
                setLoader(false)
            }
        })
    }, [])

    if (loader) return <div className='loadercomponent'><span className="loader"></span></div>


    if (posts.length===0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                               Please Login To Read Posts...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
       
            <Container>
                
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                
            </Container>
        
    )
}

export default Home