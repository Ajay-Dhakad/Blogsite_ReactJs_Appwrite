import React, { useEffect, useState } from 'react'
import authService from '../../appwrite/auth'
import {logoutBtn as Logout,Logo, Container} from '../index'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


function Header() {

  const navigate = useNavigate()

  const authStatus = useSelector((state) => state.auth.status)

  const [toggleNav,setToggleNav] = useState(false)

  // useEffect(() => {

  //   if (toggleNav === true){
  //     setToggleNav(false)
  //   }

  // },[navigate])
  

  const navItems = [
    {
      name:'Home',
      slug:'/',
      active:true
    },
    {
      name:'Login',
      slug:'/login',
      active : !authStatus

    },
    {name:'SignUp',
    slug:'/signup',
    active: !authStatus
    },

    {

      name:'Allposts',
      slug:'/allposts',
      active: authStatus

    },

    {
      name:'AddPost',
      slug:'/addpost',
      active: authStatus
    }
  ]

  return (
    <>
    <header>
      <Container> 
      <div className="webname">
    <div id='logo'>
      <Link to='/'>
      <Logo/>
      
      </Link>
      </div>
      

    <h2>ThoughtCloud</h2>
     
    </div>

    <ul className='navitem' >

   { !toggleNav && (
      navItems.map((item) => (

       item.active ? (

        <li key={item.name}>
          <button onClick={() => navigate(item.slug)}>{item.name} </button>
        </li>

       ) : null

       ))

      
    )}

      {
        authStatus && (
          <li > <Logout/> </li>
        )
       }

    </ul>

    

    < i  onClick={() =>  (setToggleNav((prev) => !prev)) } class={toggleNav ? "ri-menu-4-line" : 'ri-menu-line'}></i>

    </Container>
      
    </header>



    <div className={ toggleNav ? 'phonenav' : 'hidphonenav'}>
      
    <ul >

{ toggleNav && (
   navItems.map((item) => (

    item.active ? (

     <li key={item.name}>
       <button onClick={() => {navigate(item.slug);setToggleNav(false)}}>{item.name} </button>
     </li>

    ) : null

    ))

   
 )}

   {
     authStatus && (
       <li onClick={() => {setToggleNav(false)}} > <Logout/> </li>
     )
    }

 </ul>
      
      
      
      
      
        </div>
    </>
  )
}

export default Header
