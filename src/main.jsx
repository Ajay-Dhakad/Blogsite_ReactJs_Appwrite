import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import Home from './pages/Home.jsx'
import { AuthLayout, Homepage, Login } from './Components/index.js'
import Store from './Store/Store.js'
import AddPost from "./pages/Addpost";
import Signup from './pages/Signup'
import EditPost from "./pages/Editpost";

import Post from "./pages/Post";

import AllPosts from "./pages/Allposts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Homepage />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/allposts",
            element: (
                <AuthLayout authentication>
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/addpost",
            element: (
                <AuthLayout authentication>     
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
            path: "*", // Match any other path
            element: <Homepage />,
          },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={Store}>
    <RouterProvider router={router}/>
    </Provider>
  
)