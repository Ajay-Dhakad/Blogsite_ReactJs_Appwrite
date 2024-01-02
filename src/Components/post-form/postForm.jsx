import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function PostForm({ post }) {


    const [posting,setposting] = useState(false)
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            console.log('post image:'+ data)

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            console.log( 'dbpost',dbPost)

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            setposting(true)
            const file = await appwriteService.uploadFile(data.image[0]);
            console.log(file)

            if (file) {
                const fileId = file.$id;
                // data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id,featuredImage: fileId,postedby:userData.name});

                setposting(false)   

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        
        <form onSubmit={handleSubmit(submit)} className="postform">
            <div className="postforminputs">
                <Input
                    // label="Title :"
                    placeholder="Your Post's Title..."
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    // label="Slug :"
                    placeholder="Your Post's Slug"
                    // className="mb-4"
                    disabled
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                <div className="imagepostform">
                    {/* <p>Upload Thumbnail Image :</p> */}
                <Input
                    label={!post ? 'Upload Image:' : 'Change Image:'}
                    type="file"
                    // value='jbsbavd'
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                </div>

                {post && (


<div className="editpostimage">   
    <img

        src={appwriteService.filePreview(post.featuredImage)}
        
        alt={post.title}
        className="rounded-lg"
    />
</div>
)}

                <RTE  name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="fileandsubmit">
               
               
                <Select
                    options={["active", "inactive"]}
                    label="Post Visibility"
                    className="postformstatus"
                    {...register("status", { required: true })}
                />
                <Button  type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? (!posting ? "Update" : 'Updating...') : (!posting ? "Create Post" : 'Posting...')}
                </Button>
            </div>
        </form>
    );
}