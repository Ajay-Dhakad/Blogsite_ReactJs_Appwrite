import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from './Input';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login as authLogin } from '../store/authSlice';
import Button from './Button';

function Signup() {
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createAccount = async (data) => {
    seterror('');

    try {
      const userData = await authService.createAccount(data);

      if (userData) {
        const user = await authService.getCurrentUser();

        if (user) dispatch(authLogin(user));

        navigate('/');
      }
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <div className='signup'>
      <h1>Create Account</h1>

      {error && <p> {error}</p>}

      <form onSubmit={handleSubmit(createAccount)}>
        <Input
          label='name'
          type='text'
          placeholder='Enter your name'
          {...register('name', {
            required: true,
          })}
        />
        <Input
          label='Email'
          type='email'
          placeholder='Enter your email'
          {...register('email', {
            required: true,
          })}
        />
        <Input
          label='password'
          type='password'
          placeholder='Enter your password'
          {...register('password', { required: true })}
        />

        <button type='submit'>Signup</button>
      </form>

      <h2>
        Already have an account<Link to='/login'>Login</Link>
      </h2>
    </div>
  );
}

export default Signup;
