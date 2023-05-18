import React from 'react';
import { Navigate } from 'react-router-dom';

const Auth = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('userid');
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default Auth;