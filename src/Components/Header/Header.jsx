import React from 'react'
import authService from '../../appwrite/auth'
import {logoutBtn as Logout,Logo, Container} from '../index'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


function Header() {

  const navigate = useNavigate()

  const authStatus = useSelector((state) => state.auth.status)
  

  const navItems = [
    {
      name:'Home',
      slug:'/',
      active:true
    },
    {
      name:'login',
      slug:'/login',
      active : !authStatus

    },
    {name:'signUp',
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

    <ul id='navitem'>

    {
      navItems.map((item) => (

       item.active ? (

        <li key={item.name}>
          <button onClick={() => navigate(item.slug)}>{item.name} </button>
        </li>

       ) : null

       ))

      
    }

      {
        authStatus && (
          <li > <Logout/> </li>
        )
       }

    </ul>
    </Container>
      
    </header>
  )
}

export default Header
