import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from './Input';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login as authLogin } from '../Store/authSlice';
import Button from './Button';

function Signup() {
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signuploader,setsignuploader] = useState(false)

  const createAccount = async (data) => {
    seterror('');

    try {
      setsignuploader(true)
      const userData = await authService.createAccount(data);

      if (userData) {
        const user = await authService.getCurrentUser();

        if (user) dispatch(authLogin(user));

        setsignuploader(false)

        navigate('/');
      }
    } catch (error) {
      seterror(error.message);
      setsignuploader(false)
    }
  };


  return (
    <div className='signup'>
      <h2>Create Account</h2>

      

      <form onSubmit={handleSubmit(createAccount)} className='signupform'>

      {error && <p className='formerror'> {error}</p>}

        <Input
          // label='name'
          type='text'
          placeholder='Enter your name'
          {...register('name', {
            required: true,
          })}
        />
        <Input
          // label='Email'
          type='email'
          placeholder='Enter your email'
          {...register('email', {
            required: true,
          })}
        />
        <Input
          // label='password'
          type='password'
          placeholder='Enter your password'
          {...register('password', { required: true })}
        />

        <button type='submit'>Signup</button>

        <h2>
        Already Have An Account ?<Link to='/login'>{' '}Login</Link>
      </h2>
      </form>

      { signuploader && <div className="loadercomponent"> <span className="loader"></span></div>}


      
    </div>
  );
}

export default Signup;
