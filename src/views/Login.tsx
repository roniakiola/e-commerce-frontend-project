import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import { loginUser, registerUser } from '../redux/reducers/userReducer';
import { LoginData } from '../interfaces/LoginData';
import { RegisterData } from '../interfaces/RegisterData';
import useAppSelector from '../hooks/useAppSelector';
import useFileUpload from '../hooks/useFileUpload';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<LoginData & RegisterData>();
  const { loggedIn } = useAppSelector((state) => state.userReducer);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  // const [fileLocation, setFileLocation] = useState<string>('');
  const { fileLocation, handleFileChange } = useFileUpload();

  useEffect(() => {
    if (loggedIn) {
      navigate('/products');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  // const handleFileChange = async (file: File) => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   try {
  //     const response = await axios.post(
  //       'https://api.escuelajs.co/api/v1/files/upload',
  //       formData,
  //       { headers: { 'Content-Type': 'multipart/form-data' } }
  //     );
  //     return setFileLocation(response.data.location);
  //   } catch (e) {
  //     const error = e as AxiosError;
  //     return error;
  //   }
  // };

  const onLogin = (data: LoginData) => {
    dispatch(loginUser(data));
    reset();
  };

  const onRegister = (data: RegisterData) => {
    data.avatar = fileLocation;
    dispatch(registerUser(data));
    reset();
  };

  return (
    <>
      {!showRegister ? (
        <div className='form__login'>
          <form onSubmit={handleSubmit(onLogin)}>
            <input
              type='email'
              placeholder='Email'
              {...register('email', { required: true })}
            ></input>
            <input
              type='password'
              placeholder='Password'
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
              placeholder='Name'
              {...register('name', { required: true })}
            ></input>
            <input
              type='email'
              placeholder='Email'
              {...register('email', { required: true })}
            ></input>
            <input
              type='password'
              placeholder='Password'
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
