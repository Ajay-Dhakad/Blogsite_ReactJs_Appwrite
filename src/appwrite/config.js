import conf from "../conf/conf";
import {Client,Storage,Databases,Query,ID} from 'appwrite';

export class Service{

    Client = new Client();
    Databases;
    bucket;

    constructor(){

        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.Databases = new Databases(this.Client)
        this.bucket = new Storage(this.Client)

    }

    async createPost({title,slug,content,featuredImage,status,userId}){

            try {
                
            return await this.Databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {

                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

            } catch (error) {
                console.log("Appwrite service :: Createpost :: error",error)
            }

    }

    async updatePost(slug,{title,content,featuredImage,status}){

        try {

            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {

                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            
        } catch (error) {
            
            console.log('Appwrite :: Updatepost:',error)
            
        }
    }


    async deletePost(slug){

        try {
            
            await this.Databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            return true
        } catch (error) {
            
            console.log('APPWRITE :: DELETEPOST :',error)
            return false
        }
    }

    async getPost(slug){

        try {
            

                return await this.Databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug
                )

        } catch (error) {
            console.log('Appwrite :: getpost :',error)
        }
    }

    async getPosts(queries = [Query.equal('status','active')]){

            try {
                return await this.Databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    queries
                )
            } catch (error) {
                
                console.log('APPWRITE :: GETPOSTS :',error)
                return false
            }

    }


    //uploadfileshere------

    async uploadFile(file){
        
        try {

            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            
            console.log('Authservice ::uploadfile : ', error)

        }


    }


    async deleteFile(fileid){


        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileid
            )

            return true
        } catch (error) {
            console.log("Appwrite :: deletefile :",error)
            return false
        }

    }

    
    filePreview(fileid){

        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileid
        )

    }
}

const service = new Service()

export default service;