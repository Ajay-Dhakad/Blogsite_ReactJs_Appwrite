import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../Components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    // const [loader,setLoader ] = useState(true)

    const userData = useSelector((state) => state.auth.userData);
    console.log(post)
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                

                
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="post">
            <Container>
                    <img
                        src={appwriteService.filePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="postcruds">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button className="editpost">
                                    Edit
                                </button>
                            </Link>
                            <button bgColor="deletepost" onClick={deletePost}>
                                Delete
                            </button>
                        </div>
                    )}
               
                <div className="posttitletextbox">
                    <h4>{post.title}</h4>
                </div>
                <div className="content">

                    {parse(post.content)}

                    </div>
            </Container>
        </div>
    ) : null;
}