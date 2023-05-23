import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

import useAppDispatch from '../hooks/useAppDispatch';
import { loginUser, registerUser } from '../redux/reducers/userReducer';
import { LoginData } from '../interfaces/LoginData';
import { RegisterData } from '../interfaces/RegisterData';

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<LoginData & RegisterData>();
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [fileLocation, setFileLocation] = useState<string>('');

  const handleFileChange = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(
        'https://api.escuelajs.co/api/v1/files/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return setFileLocation(response.data.location);
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  };

  const onLogin = (data: LoginData) => {
    dispatch(loginUser(data));
  };

  const onRegister = (data: RegisterData) => {
    data.avatar = fileLocation;
    dispatch(registerUser(data));
  };

  return (
    <>
      {!showRegister ? (
        <div className='form__login'>
          <form onSubmit={handleSubmit(onLogin)}>
            <input
              type='email'
              {...register('email', { required: true })}
            ></input>
            <input
              type='password'
              {...register('password', { required: true })}
            ></input>
            <button type='submit'>Login</button>
          </form>
          <button type='button' onClick={() => setShowRegister(true)}>
            Don't have account? Register here
          </button>
        </div>
      ) : (
        <div className='form__register'>
          <form onSubmit={handleSubmit(onRegister)}>
            <input
              type='text'
              {...register('name', { required: true })}
            ></input>
            <input
              type='email'
              {...register('email', { required: true })}
            ></input>
            <input
              type='password'
              {...register('password', { required: true })}
            ></input>
            <input
              type='file'
              {...register('avatar', { required: true })}
              onChange={(e) => {
                handleFileChange(e.target.files![0]);
              }}
            ></input>
            <button type='submit'>Register</button>
          </form>
          <button type='button' onClick={() => setShowRegister(false)}>
            Already have account? Login here
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
