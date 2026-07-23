import { createContext, useContext, useEffect, useState } from 'react';
import {
  registerUser,
  loginUser,
  logoutUser,
  subscribeToAuthChanges,
} from '../firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setIsInitializing(false);
    });
    return unsubscribe;
  }, []);

  const register = async (formData) => {
    const newUser = await registerUser(formData);
    setUser(newUser);
    return newUser;
  };

  const login = async (formData) => {
    const loggedInUser = await loginUser(formData);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isInitializing,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
