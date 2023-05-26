import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAppSelector from '../hooks/useAppSelector';

const Profile = () => {
  const { loggedIn, user } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <>
      <h1>Profile</h1>
      <div>
        <img src={user?.avatar}></img>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
        <p>{user?.role}</p>
      </div>
    </>
  );
};

export default Profile;
