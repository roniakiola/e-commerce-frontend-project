import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAppSelector from '../hooks/useAppSelector';

const Profile = () => {
  const { loggedIn } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn]);

  return (
    <>
      <h1>Profile</h1>
    </>
  );
};

export default Profile;
