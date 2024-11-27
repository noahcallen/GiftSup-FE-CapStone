import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import Loading from '@/components/Loading';
import SignIn from '@/components/SignIn';
import NavBar from '@/components/NavBar';
import { useEffect, useState } from 'react';
import RegisterForm from '../../components/forms/RegisterForm';
import { checkUser } from '../auth';

function ViewDirectorBasedOnUserAuthStatus({ children }) {
  const [databaseUser, setDatabaseUser] = useState({});

  const { user, userLoading, updateUser } = useAuth();

  useEffect(() => {
    if (user && user.uid) {
      checkUser(user.uid).then(setDatabaseUser);
    }
  }, [user]);

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // Check if user is logged in
  if (user) {
    // Check if the user has registered
    if (user.uid !== databaseUser.uid) {
      // Show RegisterForm if user has not registered
      return <RegisterForm user={user} updateUser={updateUser} />;
    }
    // If user has registered, show the home page or main content
    return (
      <>
        <NavBar />
        {children} {/* Render children for home page or main content */}
      </>
    );
  }

  // Show SignIn if user is not logged in
  return <SignIn />;
}

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  children: PropTypes.node.isRequired,
};
