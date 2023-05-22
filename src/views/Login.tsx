import { useForm, Controller } from 'react-hook-form';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { loginUser } from '../redux/reducers/userReducer';
import { LoginFormInputs } from '../interfaces/LoginFormInputs';
import { useState } from 'react';

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const onLogin = (data: LoginFormInputs) => {
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
            type='password'
            {...(register('password'), { required: true })}
          ></input>
          <input
            type='email'
            {...(register('email'), { reguired: true })}
          ></input>
          <input
            type='password'
            {...(register('password'), { required: true })}
          ></input>
          <button type='submit'>Register</button>
        </form>
      )}
    </>
  );
};

export default Login;
