import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { Button,Input,Logo} from './index'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { login as authLogin} from '../Store/authSlice'
import { Link,useNavigate } from 'react-router-dom'






function Login() {

  const navigate=useNavigate()
  const dispatch = useDispatch()
  const {register,handleSubmit} = useForm()
  const [error,seterror] = useState('')
  const [logincomplete,setlogincomplete] = useState(false)

  const login = async(data) => {

    seterror('')
    try {
        setlogincomplete(true)
      const session = await authService.login(data)
      // console.log(session)

      if (session){

        const userData = await authService.getCurrentUser()

        if (userData) dispatch(authLogin(userData));
        setlogincomplete(false)
        navigate('/')

      }
      
    } catch (error) {

      setlogincomplete(false)
      seterror(error.message)
      
      
    }


  }

  if (logincomplete){
    return <div className="loadercomponent"> <span className="loader"></span></div>
  }

  return (
    
    

    <div className='Login'>

      <h2>Login to your Account</h2>
    

      <form onSubmit={handleSubmit(login)} className='loginform' action="">

      {
        error && <p className='formerror'> {error} </p>
      }

      <Input 
      // label = 'Email'
      type='email'
      placeholder='Enter your email'
      {
        ...register('email',{
          required: true,
       
        })
      }
      />

         <Input 
      // label = 'password'
      type='password'
      placeholder='Enter your password' 
      {...register('password',{required:true})}/>

      <input type='submit' value={'login'}/>

      <h2>Dont Have Any Account  
        <Link to='/signup'>{' '}Signup !</Link>
      </h2> 

      </form>

     

        
    </div> 
    
  )}

export default Login
