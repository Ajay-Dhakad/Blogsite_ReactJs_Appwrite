import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { Button,Input,Logo} from './index'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { login as authLogin} from '../store/authSlice'
import { Link,useNavigate } from 'react-router-dom'






function Login() {

  const navigate=useNavigate()
  const dispatch = useDispatch()
  const {register,handleSubmit} = useForm()
  const [error,seterror] = useState('')

  const login = async(data) => {

    seterror('')
    try {

      const session = await authService.login(data)
      console.log(session)

      if (session){

        const userData = await authService.getCurrentUser()

        if (userData) dispatch(authLogin(userData));
        navigate('/')

      }
      
    } catch (error) {

      seterror(error.message)
      
    }


  }

  return (
    <div className='Login'>

      <h2>Login To Your Account</h2>
      {
        error && <h1 className='formerror'> {error} </h1>
      }

      <form onSubmit={handleSubmit(login)} className='loginform' action="">

      <Input 
      label = 'Email'
      type='email'
      placeholder='Enter your email'
      {
        ...register('email',{
          required: true,
       
        })
      }
      />

         <Input 
      label = 'password'
      type='password'
      placeholder='Enter your password' 
      {...register('password',{required:true})}/>

      <input type='submit' value={'login'}/>

      </form>

     

      <h2>dont have any Account 
        <Link to='/signup'>Signup</Link>
      </h2>    
    </div>
  )
}

export default Login
