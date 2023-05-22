import { useForm } from 'react-hook-form';

import useAppDispatch from '../hooks/useAppDispatch';
import { loginUser } from '../redux/reducers/userReducer';
import { LoginData } from '../interfaces/LoginData';
import { useState } from 'react';
import { RegisterData } from '../interfaces/RegisterData';

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<LoginData | RegisterData>();
  const [showRegister, setShowRegister] = useState<boolean>(true);

  const onLogin = (data: LoginData) => {
    console.log(data);
    dispatch(loginUser(data));
  };

  return (
    <>
      {!showRegister ? (
        <form onSubmit={handleSubmit(onLogin)}>
          <input
            type='email'
            {...(register('email'), { reguired: true })}
          ></input>
          <input
            type='password'
            {...(register('password'), { required: true })}
          ></input>
          <button type='submit'>Login</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onLogin)}>
          <input
            type='text'
            {...(register('name'), { required: true })}
          ></input>
          <input
            type='email'
            {...(register('email'), { reguired: true })}
          ></input>
          <input
            type='password'
            {...(register('password'), { required: true })}
          ></input>
          <input type='file'></input>
          <button type='submit'>Register</button>
        </form>
      )}
    </>
  );
};

export default Login;
