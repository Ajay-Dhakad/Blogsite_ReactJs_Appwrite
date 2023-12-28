import React from 'react'
import authService from '../../appwrite/auth'
import {useDispatch} from 'react-redux'
import { logOut } from '../../store/authSlice'
function logoutBtn() {

    const dispatch = useDispatch()

    function logout(){

            authService.logout().then(() =>  dispatch(logOut()))
    }

  return (
      
      <button id='logout' onClick={logout}>Logout</button>
    
  )
}

export default logoutBtn
